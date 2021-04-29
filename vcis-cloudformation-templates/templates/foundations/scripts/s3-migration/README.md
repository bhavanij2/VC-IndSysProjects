# S3 Common operations script

If you are here because of the spike please follow this [Spike](./Spike.md)

In order to use this command line make sure to install at least:

- Python 3.8

# Purpose

The purpose of this command line is to help:

* Create a bucket
* Check Bucket size
* Check all buckets size from account
* Check if bucket is available
* Sync Two buckets
* Transfer versioned files.

# Install 

- Download the source of this repo
- sudo pip3 install -r requirements.txt

# Tests

So far there tests on the support functions, which basically covers the core of the cli commands, still missing a bunch of them.

To run it:

```pytest``` or ```pytest  --cov=. --cov-report=html``` 

Check the html to see detailed coverage.

# Commands

## Create bucket

This command will create a bucket with:

* AES-256 Encryption
* Static website hosting

Command:

```s3_transfer creates3bucket --bucket_name <bucket-name> --region <region-name>```

## Check bucket size

Just checks bucket size in human readable format.

```./s3_transfer checkS3Bucket --bucket-name <bucket-name>```

## Check all buckets sizes

Just checks all buckets size in human readable format and write it to a CSV file.

```./s3_transfer s3BucketSizeAll```

## Check if bucket is available

This will trigger everyminute to see if the bucket is available.

```./s3_transfer checkS3Bucket --bucket-name <bucket-name>```

## Transfer versioned files

**NOTE: The bucket must be versioned AND IT WILL ONLY ACCEPT FILES WITH EXTENSIONS.**

This command will copy the file with all the previous versions in the same order.

```./s3_transfer transferversionedfiles --source_bucket <source_name> --dest_bucket <dest_bucket> --prefix```


## Sync two folders

It will sync two buckets utilizing aws native sync, if no folder/key is specified it will sync entire bucket

Please check the --help to see full explanation.

Basic usage:

    s3synckeys -source_bucket <source_name> --dest_bucket <dest_bucket> --source_region <source_region> --dest_region <dest_region> --folders <folder1> --ffolders <folder2> -folders <folderN>

# Complete Flow of the migration with source deletion

To do the complete flow of the migration the steps are:
- ./s3_transfer creates3bucket [TEMPORARY BUCKET NAME] us-east-1
- aws s3 sync s3://[bucket-name] s3://[TEMPORARY BUCKET NAME] --source-region us-east-1 --region us-east-1 --ACL bucket-owner-full-control --metadata-directive COPY
- aws s3 rb s3://[bucket-name] --force
- ./s3_transfer creates3bucket [bucket-name] us-east-1
- aws s3 sync s3://TEMPORARY BUCKET NAME] s3://[bucket-name] --source-region us-east-1 --region us-east-1
- aws s3 rb s3://[TEMPORARY BUCKET NAME] --force (Or use empty function at AWS console)

Or use the ```./s3_transfer s3SyncKeys``` to do the exactly same commands above.

Refer to [Sync two folders](##Sync-two-folders)

We can also use the `./s3_transfer checkS3Bucket --bucket_name <bucket-name>` if the creation gets some error to make sure that the name is available.

Others functions that may help:
`./s3_transfer s3BucketSizeAll` - To see the size of all buckets
`./s3_transfer s3BucketSize --bucket_name` - To check the size of one bucket

## Observations
Before run this flow it's necessary to:
1. Change the *Bucket Policy of the bucket that will be migrated (on the Shared Account)*. An example of the policy it's on this repo: `s3sync_bucketpolicy_originalaccount.json`. 
2. Change the *Policy on IAM Role for Admin Role on the Dev Account*. An example of the policy it's on this repo: `s3sync_policy_devaccount.json`.
3. **After migration we must grant access to the new bucket to the shared account.**