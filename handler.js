"use strict";

const AWS = require("aws-sdk");
const { extname } = require("path");

const S3 = new AWS.S3();

module.exports.hello = async ({ Records: records }) => {
  try {
    await Promise.all(
      records.map(async (record) => {
        const { key } = record.s3.Object;

        const image = await S3.getObject({
          Bucket: process.env.bucket,
          Key: key,
        }).promise();
      })
    );
    return {
      statusCode: 200,
      body: `Opa patrão, foi inserido um arquivo do tipo:  ${extname(key)}`,
    };
  } catch (err) {
    return err;
  }
};
