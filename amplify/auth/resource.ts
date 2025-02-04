import { defineAuth } from '@aws-amplify/backend';
import { preSignUp } from './pre-sign-up/resource';
import { customMessage } from "./custom-message/resource";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: 'Welcome to SwimOptimizer 👋 Verify your email!'
    }
  },
  triggers: {
    preSignUp, customMessage
  }
  
});
