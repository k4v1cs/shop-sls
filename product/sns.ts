export default {
  SNSTopic: {
    Type: 'AWS::SNS::Topic',
    Properties: {
      TopicName: 'createProductTopic'
    },
  },
  SNSSubscriptionA: {
    Type: 'AWS::SNS::Subscription',
    Properties: {
      Endpoint: '${ssm:/product/sns/email/a}',
      Protocol: 'email',
      TopicArn: {
        Ref: 'SNSTopic',
      },
      FilterPolicy: {
        isHighValue: ['no']
      }
    },
  },
  SNSSubscriptionB: {
    Type: 'AWS::SNS::Subscription',
    Properties: {
      Endpoint: '${ssm:/product/sns/email/b}',
      Protocol: 'email',
      TopicArn: {
        Ref: 'SNSTopic',
      },
      FilterPolicy: {
        isHighValue: ['yes']
      }
    },
  },
}