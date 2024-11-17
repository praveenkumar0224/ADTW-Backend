import path from 'node:path';
import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVariablesSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires')
  })
  .unknown();

const { value: envVariables, error } = envVariablesSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVariables.NODE_ENV,
  port: envVariables.PORT,
  features: {
    file: envVariables.FILE_UPLOAD,
    email_SMTP: envVariables.EMAIL_ACTIVE
  },
  otp: {
    expires_time: envVariables.OTP_EXPIRES
  },
  jwt: {
    secret: envVariables.JWT_SECRET,
    accessExpirationMinutes: envVariables.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVariables.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVariables.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVariables.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    reauthentiacteExpiryMinutes: envVariables.REAUTHENTICATE_EXPIRY_MINUTES
  },
  email: {
    smtp: {
      host: envVariables.SMTP_HOST,
      port: envVariables.SMTP_PORT,
      auth: {
        user: envVariables.SMTP_USERNAME,
        pass: envVariables.SMTP_PASSWORD
      }
    },
    from: envVariables.EMAIL_FROM
  },
  azure: {
    sasurl: envVariables.SAS_URL,
    sastoken: envVariables.SAS_TOKEN,
    container_name: envVariables.CONTAINER_NAME
  },
  aws: {
    bucketName: envVariables.AWS_BUCKETNAME,
    bucketRegion: envVariables.AWS_BUCKETREGION,
    bucketAccessKey: envVariables.AWS_BUCKET_ACCESS_KEY,
    bucketSecretKey: envVariables.AWS_BUCKET_SECRET_KEY
  },
  redis: {
    url: envVariables.REDIS_URL
  },
  bullmq: {
    DEFAULT_REMOVE_CONFIG: {
      removeOnComplete: {
        age: 3600
      },
      removeOnFail: {
        age: 24 * 3600
      }
    }
  }
};
