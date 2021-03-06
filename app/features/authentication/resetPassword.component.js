class ResetPasswordController {
  constructor($q, ENV, $routeParams, messageService,
    workingModalService, authenticationService, $location, errorService) {
    this.$q = $q;
    this.ENV = ENV;
    this.$routeParams = $routeParams;
    this.messageService = messageService;
    this.workingModalService = workingModalService;
    this.authenticationService = authenticationService;
    this.$location = $location;
    this.errorService = errorService;
  }

  $onInit() {
    this.showPassword = false;
    this.showResetForm = false;

    if (this.authenticationService.isAuthenticated()) {
      this.authenticationService.sendAuthenticatedUserToPreviousPath();
      return;
    }

    this.email = this.$routeParams.email;
    this.resetToken = this.$routeParams.token;

    if ((this.email === null) || (this.resetToken === null)) {
      this.messageService.showError('Invalid token or email');
      this.showResetForm = false;
      return;
    }

    const verifyModel = {
      _email: this.email,
      _verificationToken: this.resetToken,
    };

    const verifyResult = this.authenticationService.verifyResetToken(verifyModel);

    const verificationSuccess = () => {
      this.showResetForm = true;
    };

    const verificationFailure = () => {
      this.showResetForm = false;
    };

    verifyResult.promise.then(verificationSuccess, verificationFailure);
  }

  passwordInputType() {
    return this.showPassword
      ? 'text'
      : 'password';
  }

  submitClicked() {
    if (this.form.$valid) {
      this.resetPassword();
    }
  }

  resetFormIsInvalid() {
    return this.resetInProgress || !this.form.$valid;
  }

  resetPassword() {
    this.workingModalService.openModal();

    const resetModel = {
      _email: this.email,
      _password: this.form.password.$viewValue,
      _verificationToken: this.resetToken,
      _confirmPassword: this.form.confirmedPassword.$viewValue,
    };

    this.resetInProgress = true;

    const resetResult = this.authenticationService.resetPassword(resetModel);

    this.messageService.closeToasts();

    const resetSuccessHandler = () => {
      this.resetInProgress = false;
      this.workingModalService.closeModal();

      this.form.$setPristine();

      this.$location.path('/login');

      this.messageService.showInfo('Your password has been set - you may log in now');
    };

    const resetFailureHandler = response => {
      this.resetInProgress = false;
      this.workingModalService.closeModal();

      const resetError = this.errorService.parseValidationErrorsFromResponse(response);

      this.messageService.showError(`${resetError}`, 'Unable to Reset Password');
    };

    resetResult.promise.then(resetSuccessHandler, resetFailureHandler);
  }
}

ResetPasswordController.$inject = [
  '$q',
  'ENV',
  '$routeParams',
  'messageService',
  'workingModalService',
  'authenticationService',
  '$location',
  'errorService',
];

angular.module('phpdraft.authentication').component('phpdResetPassword', {
  controller: ResetPasswordController,
  templateUrl: 'app/features/authentication/resetPassword.component.html',
});
