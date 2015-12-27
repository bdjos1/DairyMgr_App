angular.module('app.translate', ['pascalprecht.translate', 'tmh.dynamicLocale'])
  .config(function($translateProvider, $translatePartialLoaderProvider, tmhDynamicLocaleProvider ) {
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/i18n/{lang}/{part}.json'
    });

    $translateProvider.preferredLanguage('en');
    //$translateProvider.useMissingTranslationHandlerLog();
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
}).constant('LOCALES', {
    'locales': {
        'fr': 'Française',
        'en': 'English'
    },
    'preferredLocale': 'en'
});
