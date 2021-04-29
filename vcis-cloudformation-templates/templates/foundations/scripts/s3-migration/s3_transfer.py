#!/usr/bin/env python
"""
S3 Support and Transfer.
"""
import sys
import time
import csv
import pathlib
import subprocess
import shlex
import boto3
import click
from botocore.client import ClientError

#Instantiate S3 resource and client

#Support Functions
def checkS3(bucket_name):
    """
    Check S3 support function
    """
    s3 = boto3.resource('s3')
    try:
        s3.meta.client.head_bucket(Bucket=bucket_name)
        return True
    except ClientError as e:
        click.echo(e, err=True)
        return False

# bytes pretty-printing
UNITS_MAPPING = [
    (1<<50, ' PB'),
    (1<<40, ' TB'),
    (1<<30, ' GB'),
    (1<<20, ' MB'),
    (1<<10, ' KB'),
    (1, (' byte', ' bytes')),
]

def pretty_size(filebytes):
    """Get human-readable file sizes.
    simplified version of https://pypi.python.org/pypi/hurry.filesize/
    """
    for factor, suffix in UNITS_MAPPING:
        if filebytes >= factor:
            break
    amount = int(filebytes / factor)

    if isinstance(suffix, tuple):
        singular, multiple = suffix
        if amount == 1:
            suffix = singular
        else:
            suffix = multiple
    return str(amount) + suffix

def keys(bucket_name, prefix='/', delimiter='/'):  # Prefix for testin is documentation/
    """
    Get keys from bucket.
    """
    prefix = prefix[1:] if prefix.startswith(delimiter) else prefix
    bucket = boto3.resource('s3').Bucket(bucket_name)
    return (_.key for _ in bucket.objects.filter(Prefix=prefix))

def clean_folders(total_keys):
    """
    Clean the folders and only get files with extension.
    """
    files_only = []
    for key in total_keys:
        if pathlib.Path(key).suffix != '':
            files_only.append(key)
    return files_only

def copy_all_files(version, source_bucket, dest_bucket):
    """
    Copy all files.
    """
    s3_client = boto3.client('s3')
    for ver in version.get('Versions')[::-1]:
        copy_source = {
            'Bucket': source_bucket,
            'Key': ver['Key'],
            'VersionId': ver['VersionId']
        }
        s3_client.copy_object(
            Bucket=dest_bucket,
            CopySource=copy_source,
            Key=f"{ver['Key']}",
            MetadataDirective='COPY',
            TaggingDirective='COPY',
            ServerSideEncryption='AES256',
            StorageClass='STANDARD'
        )
        click.echo(f"Copied {ver['Key']} with {ver['VersionId']}")

@click.group()
def cli():
    """Cli created to help migrate S3 buckets from one account to another"""
    pass # pragma: no cover

#Click Functions
@click.command()
@click.option('--bucket_name', '-bn', required=True)
def checkS3Bucket(bucket_name):
    """Checks every minute if the bucket exists

    \b
    Usage:

    checks3bucket --bucket_name <bucketname>

    """
    timenow = time.time()
    while True:

        endtime = ''
        if checkS3(bucket_name):
            click.echo('Bucket still exists')
            time.sleep(60)
        else:
            click.echo('Bucket doesnt exists anymore or dont have access')
            endtime = time.time()
            break
    deltat = (endtime - timenow) // 60 % 60
    click.echo(f"Took {deltat} in order to have the bucket available again")
    return True

@click.command()
def s3BucketSizeAll():
    """Checks Every bucket size on the account in human readable format.

    \b
    Usage:

    s3BucketSizeAll

    """
    s3client = boto3.client('s3')
    s3 = boto3.resource('s3')
    allbuckets = s3client.list_buckets()
    bucket_dict = {}
    totalsize = 0
    for bucket in allbuckets['Buckets']:
        size_byte = 0
        my_bucket = s3.Bucket(bucket['Name'])
        for my_bucket_object in my_bucket.objects.all():
            size_byte = size_byte+my_bucket_object.size
        totalsize += size_byte
        bucket_dict[bucket['Name']] = pretty_size(size_byte)
        click.echo(f"Bucket: {bucket['Name']} has a total of {pretty_size(size_byte)}")
    click.echo(f"All Buckets have a total of {pretty_size(totalsize)}")
    with open('buckets.csv', 'w') as f:
        w = csv.writer(f)
        w.writerows(bucket_dict.items())

@click.command()
@click.option('--bucket_name', '-bn', required=True)
def s3BucketSize(bucket_name):
    """Checks a single Bucket size in human readable format.

    \b
    Usage:

    s3BucketSize --bucket_name <bucket_name>

    """
    s3 = boto3.resource('s3')
    size_byte = 0
    my_bucket = s3.Bucket(bucket_name)
    for my_bucket_object in my_bucket.objects.all():
        size_byte = size_byte+my_bucket_object.size
    totalsize = size_byte
    click.echo(f"Bucket: {bucket_name} has a total of {pretty_size(totalsize)}")

@click.command()
@click.option('--bucket_name', '-bn', required=True)
@click.option('--region', '-r', default='')
def createS3Bucket(bucket_name, region):
    """Create a S3 Bucket.
    \b
    Usage:

    createS3Bucket --bucket_name <bucket_name> --region <region>

    """
    try:
        if region == 'us-east-1':
            s3_client = boto3.client('s3')
            s3_client.create_bucket(Bucket=bucket_name,
                                    ACL='private')
        else:
            s3_client = boto3.client('s3', region_name=region)
            location = {'LocationConstraint': region}
            s3_client.create_bucket(Bucket=bucket_name,
                                    CreateBucketConfiguration=location,
                                    ACL='private')
    except ClientError as e:
        click.echo(e, err=True)
        return False

    # Set Encryption to AES-256
    s3_client.put_bucket_encryption(Bucket=bucket_name, \
        ServerSideEncryptionConfiguration={
            'Rules': [
                {'ApplyServerSideEncryptionByDefault': {'SSEAlgorithm': 'AES256'}},]
            })

    # Define the website configuration
    website_configuration = {
        'ErrorDocument': {'Key': 'error.html'},
        'IndexDocument': {'Suffix': 'index.html'},
    }

    # Set the website configuration
    s3_client = boto3.client('s3')
    s3_client.put_bucket_website(Bucket=bucket_name,
                                 WebsiteConfiguration=website_configuration)
    return True


@click.command()
@click.option('--source_bucket', '-sb', required=True)
@click.option('--dest_bucket', 'db', required=True)
@click.option('--prefix', '-p', default='')
def transferVersionedFiles(source_bucket, dest_bucket, prefix=''):
    """Copy all files and versions to destination bucket, (maybe) limit of 1000Keys.
    \b
    Usage:

    transferversionedfiles --source_bucket <source_name> --dest_bucket <dest_bucket> --prefix <keyPrefix>

    """
    #Get bucket Info
    s3_client = boto3.client('s3')
    response = s3_client.get_bucket_versioning(Bucket=dest_bucket)
    if 'Status' in response and dest_bucket != source_bucket:
        total_keys = keys(source_bucket, prefix)
        clean_keys = clean_folders(total_keys)
        for key in clean_keys:
            version = s3_client.list_object_versions(Bucket=source_bucket, Prefix=key)
            click.echo(version)
            copy_all_files(version, source_bucket, dest_bucket)
    else:
        click.echo(f"The bucket {dest_bucket} is not with versioning enabled or you are \
            trying to sync the same bucket")
        sys.exit()

@click.command()
@click.option('--source_bucket', '-sb', required=True)
@click.option('--dest_bucket', '-db', required=True)
@click.option('--source_region', '-sr', default='us-east-1', show_default=True)
@click.option('--dest_region', '-dr', default='us-east-1', show_default=True)
@click.option('--folders', '-f', multiple=True, default='', show_default=True)
def s3SyncKeys(source_bucket, dest_bucket, source_region, dest_region, folders):
    """Subprocess of aws s3 native sync, it will sync specified folders to a new \
        bucket, if no folder is specified
    \b
    Usage:

    s3synckeys -source_bucket <source_name> --dest_bucket <dest_bucket> \
        --source_region <source_region> \
        --dest_region <dest_region> --folders <folder1>/* --folders <folder2>/* \
            ... -folders <folderN>/*
    s3synckeys <source_name> <dest_bucket> -sr <source_region> -dr \
        <dest_region> -f <folder1>/* --f <folder2>/* ... -f <folderN>/*

    Source region and destination region is set default to us-east-1, please \
        change it if you are doing cross region syncs.

    This will output the following:

    aws s3 sync s3://source_bucket s3://dest_bucket --exclude '*' --include \
        <folder1>/* --include <folder2>/* --include <folderN>/* --source-region \
            us-east-1 --region us-east-1 --acl 'bucket-owner-full-control' \
                --metadata-directive 'COPY'"
    """
    exclude = ''
    include_dirs = ''
    if folders:
        exclude = "--exclude '*'"
    else:
        exclude = ''
    #Generates the command
    for folder in folders:
        include_dirs += f" --include '{folder}'"
    full_sync_command = f"aws s3 sync s3://{source_bucket} s3://{dest_bucket} \
        {exclude} {include_dirs} --source-region {source_region} --region {dest_region} \
             --acl 'bucket-owner-full-control' --metadata-directive 'COPY'"
    click.clear()
    # Echoing
    click.echo(click.style('The following command will be used to do the sync:\n'))
    click.secho(full_sync_command, bold=True, fg='red')
    click.secho('\n')
    # Confirm Subprocess
    click.confirm('Are you competely sure that you want to continue?', abort=True)
    # Run Subprocess
    subprocess.run(shlex.split(full_sync_command), check=True, stderr=sys.stderr, stdout=sys.stdout)

#Associating Commands to cli
cli.add_command(checkS3Bucket)
cli.add_command(s3BucketSizeAll)
cli.add_command(s3BucketSize)
cli.add_command(createS3Bucket)
cli.add_command(transferVersionedFiles)
cli.add_command(s3SyncKeys)

if __name__ == '__main__':
    cli() # pragma: no cover
