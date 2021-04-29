# S3 Syncronization
## Creating a bucket with the same name on the new account
The ideia is to have less refactors on the lambdas and use the same url as it's today. Also on this option we won't need to create anything new besides the new bucket. So it's the cheaper and faster option.

### How to do
For this we would need to create an temporary bucket on the new account and an automated script that would run the following steps:
- Copy (or sync) the bucket from the shared account to the temporary bucket on the new account
- Check to make sure that the files are correct on the temporary bucket
- Delete the bucket of the shared account
- Wait some time so AWS can realize that the bucket were deleted
- Create a new bucket on the new account with exactly the same name and region of the old bucket
- Move the files from the temporary bucket to the new one.

### Concerns
The concerns about this option is:
- Probably it will have some downtime, as AWS take some time to replicate that the bucket were deleted to create a new one with the exactly same name (as the names of the buckets are universal and unique, it's needed to wait this time). During this time, we need to make sure that there won't be new files on the buckets.
- It won't be possible to maintain the bucket on the shared account. If this is needed, it's possible to create a new bucket on the shared account and replicate to it, but it won't have the same name.
- May take some time to sync if the bucket is too big (more than 1TB).

### Solutions 
- Test sync with different buckets size to predict how long it will take the sync and the creation of the bucket;
- Sync periodically before the big migration may reduce this time;
- Create a script to check if the name is available;
- Create a backup bucket (with different name) on the shared account to maintain the information there.
- Revisit the policies to make sure it will work.

### Documentation
- [Copy S3 Buckets Accross AWS Accounts](https://medium.com/tensult/copy-s3-bucket-objects-across-aws-accounts-e46c15c4b9e1)


# Support Script to do the migration
On this repo is present the inicial script to procede with this migration.
