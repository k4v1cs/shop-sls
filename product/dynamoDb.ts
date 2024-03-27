export default {
    productsTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
            TableName: "${self:custom.dynamoDb.productsTableName}",
            AttributeDefinitions: [{
                AttributeName: "id",
                AttributeType: "S"
            }],
            KeySchema: [{
                AttributeName: "id",
                KeyType: "HASH"
            }
            ],
            BillingMode: "PAY_PER_REQUEST"
        }
    },
    stocksTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
            TableName: "${self:custom.dynamoDb.stocksTableName}",
            AttributeDefinitions: [{
                AttributeName: "product_id",
                AttributeType: "S"
            }],
            KeySchema: [{
                AttributeName: "product_id",
                KeyType: "HASH"
            }
            ],
            BillingMode: "PAY_PER_REQUEST"
        }
    }
}