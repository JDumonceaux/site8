import { useNavigate } from 'react-router-dom';

import {
  confirmResetPassword,
  resetPassword,
  type ResetPasswordOutput,
  updatePassword,
} from 'aws-amplify/auth';

import { useAuthAsync } from './useAuthAsync';
import type { AuthState } from './useAuthState';

/**
 * Hook for password management operations
 */
export const usePasswordManagement = (authState: AuthState) => {
  const { executeAuthOperation } = useAuthAsync(authState);
  const navigate = useNavigate();

  /**
   * Handle password reset flow steps and navigation
   */
  const handleResetPasswordNextStep = (
    step: ResetPasswordOutput['nextStep'],
  ) => {
    switch (step.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE': {
        // The user needs to complete the sign-in process with a code
        // Code delivery details available in step.codeDeliveryDetails.deliveryMedium
        break;
      }
      case 'DONE': {
        // The user has successfully changed their password
        void navigate('/');
        break;
      }
    }
  };

  /**
   * Confirm password reset with verification code
   */
  const authConfirmResetPassword = async (
    eMailAddress: string,
    code: string,
    newPassword: string,
  ) => {
    await executeAuthOperation(async () => {
      await confirmResetPassword({
        confirmationCode: code,
        newPassword,
        username: eMailAddress,
      });
    });
  };

  /**
   * Initiate password reset - sends code to user's email/SMS
   */
  const authResetPassword = async (eMailAddress: string) => {
    await executeAuthOperation(async () => {
      const { nextStep } = await resetPassword({
        username: eMailAddress,
      });
      handleResetPasswordNextStep(nextStep);
    });
  };

  /**
   * Update password for authenticated user
   */
  const authUpdatePassword = async (
    oldPassword: string,
    newPassword: string,
  ) => {
    await executeAuthOperation(async () => {
      await updatePassword({
        newPassword,
        oldPassword,
      });
    });
  };

  return {
    authConfirmResetPassword,
    authResetPassword,
    authUpdatePassword,
  };
};
