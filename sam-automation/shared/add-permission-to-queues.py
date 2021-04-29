import boto3
import json
from colorama import Fore, Style, Style
import atexit

sqs = boto3.resource('sqs')
client = boto3.client('sqs')

def exit_handler():
    print(Style.RESET_ALL + 'The process has finished')

atexit.register(exit_handler)

def main():
    count = 0
    count_no_policy = 0
    queue_iterator = sqs.queues.filter(QueueNamePrefix='brazil-value-capture-')

    for q in queue_iterator:
        count = count + 1
        print(Fore.GREEN)
        print(q.url)
        attrs = client.get_queue_attributes(QueueUrl=q.url, AttributeNames=['QueueArn', 'Policy'])
        print(Style.RESET_ALL)
        
        try:
            sqs_policy = json.loads(attrs['Attributes']['Policy'])
            statement_already_exists = False
            
            for stm in sqs_policy['Statement']:
                if stm['Sid'] == 'vcis-' + q.url[62:] + '-get-queue-attrs-policy':
                    statement_already_exists = True
                    break

            if not statement_already_exists:
                statement = {
                    'Sid': 'vcis-' + q.url[62:] + '-get-queue-attrs-policy',
                    'Effect': 'Allow',
                    'Principal': {
                        'AWS': 'arn:aws:iam::285453578300:user/brazil-value-capture-jenkins'
                    },
                    'Action': ['SQS:GetQueueUrl', 'SQS:GetQueueAttributes'],
                    'Resource': attrs['Attributes']['QueueArn']
                }
                sqs_policy['Statement'].append(statement)
                client.set_queue_attributes(QueueUrl=q.url, Attributes={'Policy': json.dumps(sqs_policy)})
        except KeyError:
            count_no_policy = count_no_policy + 1
    print(count)
    print(count_no_policy)

if __name__ == '__main__':
    main()