import { Command } from 'commander'
import { uploadToS3 } from './upload'

const program = new Command()

program
  .requiredOption('--path <paths>', 'Paths what to upload, comma-separated')
  .requiredOption('--aws-access-key-id <key>', 'AWS Access Key ID')
  .requiredOption('--aws-secret-access-key <key>', 'AWS Secret Access Key')
  .requiredOption('--aws-bucket <bucket>', 'AWS Bucket Name')
  .requiredOption('--aws-region <region>', 'AWS Region')
  .option('--aws-endpoint-url <url>', 'AWS Endpoint URL')
  .option('--aws-use-path-style', 'Use path-style URLs for S3', false)

program.parse(process.argv)

interface Options {
  path: string
  awsAccessKeyId: string
  awsSecretAccessKey: string
  awsBucket: string
  awsRegion: string
  awsEndpointUrl?: string
  awsUsePathStyle: boolean
}

const options = program.opts<Options>()
const paths = options.path.split(',')

uploadToS3({
  paths: paths,
  awsKeyId: options.awsAccessKeyId,
  awsSecretAccessKey: options.awsSecretAccessKey,
  awsBucket: options.awsBucket,
  awsRegion: options.awsRegion,
  awsEndpoint: options.awsEndpointUrl,
  awsUsePathStyle: options.awsUsePathStyle
}).catch(error => {
  console.error(error)
  process.exit(1)
})
