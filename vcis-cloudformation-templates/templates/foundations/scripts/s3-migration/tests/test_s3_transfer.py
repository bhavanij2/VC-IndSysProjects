""" Tests """
import importlib.util
import os
import pytest
from moto import mock_s3
import boto3


#Import Custom lib
basedir = os.path.join(os.path.dirname(__file__), '..')
print(basedir)
spec = importlib.util.spec_from_file_location('s3_transfer', f"{basedir}/s3_transfer.py")
s3_transfer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(s3_transfer)

@pytest.fixture(scope='function')
def aws_credentials():
    """Mocked AWS Credentials for moto. Do not put real credentials here."""
    os.environ['AWS_ACCESS_KEY_ID'] = 'testing'
    os.environ['AWS_SECRET_ACCESS_KEY'] = 'testing'
    os.environ['AWS_SECURITY_TOKEN'] = 'testing'
    os.environ['AWS_SESSION_TOKEN'] = 'testing'

@pytest.fixture(scope='function')
def s3(aws_credentials):
    """ s3 mock fixture """
    with mock_s3():
        yield boto3.client('s3', region_name='us-east-1')

s3_files_list = ['my/first/file',
                 'my/first/real/file.txt',
                 'my/second/real/file.txt']

def setup_s3(s3):
    """ Setup S3 bucket test """
    mybucket = 'mybucket'
    conn = boto3.resource('s3', region_name='us-east-1')
    conn.create_bucket(Bucket=mybucket)
    s3.put_bucket_versioning(
        Bucket=mybucket, VersioningConfiguration={'Status': 'Enabled'}
    )
    s3.put_object(Bucket=mybucket, Key='my/first/file', Body='')
    s3.put_object(Bucket=mybucket, Key='my/first/real/file.txt', Body='test content 1')
    s3.put_object(Bucket=mybucket, Key='my/first/real/file.txt', Body='test2 content 1')
    s3.put_object(Bucket=mybucket, Key='my/second/real/file.txt', Body='test content 2')
    s3.put_object(Bucket=mybucket, Key='my/second/real/file.txt', Body='test2 content 2')
    return mybucket

def setup_s3_dest(s3):
    """ Setup S3 bucket test """
    mybucket = 'destbucket'
    conn = boto3.resource('s3', region_name='us-east-1')
    conn.create_bucket(Bucket=mybucket)
    s3.put_bucket_versioning(
        Bucket=mybucket, VersioningConfiguration={'Status': 'Enabled'}
    )
    return mybucket

def test_check_s3(s3):
    """
    Test checks3
    """
    conn = boto3.resource('s3', region_name='us-east-1')
    conn.create_bucket(Bucket='mybucket')

    assert s3_transfer.checkS3('mybucket')

def test_checks3_fails(s3):
    """
    Test checks3 fail path
    """
    conn = boto3.resource('s3', region_name='us-east-1')
    conn.create_bucket(Bucket='mybucket')

    assert not s3_transfer.checkS3('itwillfail')

def test_pretty_size_success():
    """ pretty size success """
    gb = s3_transfer.pretty_size(1073741824)
    assert gb == '1 GB'

def test_pretty_size_correct_singular():
    """ pretty size single byte """
    gb = s3_transfer.pretty_size(1)
    assert gb == '1 byte'

def test_pretty_size_correct_multiple():
    """ pretty size multiple bytes """
    gb = s3_transfer.pretty_size(2)
    assert gb == '2 bytes'

def test_keys(s3):
    """ test keys """
    keys = s3_transfer.keys(setup_s3(s3))
    list_keys = []
    for key in keys:
        list_keys.append(key)
    assert list_keys == s3_files_list
def test_clean_folders():
    """ Clean folders """
    list_keys = s3_files_list
    assert len(s3_transfer.clean_folders(list_keys)) == 2
    
def test_copy_all_files(s3):
    # Source
    conn = boto3.resource('s3', region_name='us-east-1')
    total_keys = s3_transfer.keys(setup_s3(s3))
    total_keys_dest = s3_transfer.keys(setup_s3_dest(s3))
    # Dest
    clean_keys = s3_transfer.clean_folders(total_keys)
    clean_keys_dest = s3_transfer.clean_folders(total_keys_dest)
    s3_client = boto3.client('s3')
    version = ''
    copy_res = []
    copy_res_dest = []
    for key in clean_keys:
        version = s3_client.list_object_versions(Bucket='mybucket', Prefix=key)
        s3_transfer.copy_all_files(version, 'mybucket', 'destbucket')
        for ver in version.get('Versions')[::-1]:
            obj = conn.Object('mybucket', key)
            body = obj.get()['Body'].read()
            copy_res.append(f"{ver['Key']} , {body}")
    print(copy_res)

    for key in clean_keys:
        version = s3_client.list_object_versions(Bucket='destbucket', Prefix=key)
        for ver in version.get('Versions')[::-1]:
            obj = conn.Object('mybucket', key)
            body = obj.get()['Body'].read()
            copy_res_dest.append(f"{ver['Key']} , {body}")
    print(copy_res_dest)
    
    assert copy_res == copy_res_dest
def test_cli():
    """There's no implementation
        of this method"""
pass
