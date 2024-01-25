module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],  // Używamy Jasmine jako frameworku do testów
    browsers: ['Chrome'],    // Uruchamiamy testy w przeglądarce Chrome, możesz dostosować do innych przeglądarek
    files: [
      "src/app/current-weather/current-weather.component.ts",     // Ścieżki do plików specjalnych testów
    ],
    preprocessors: {
      'src/**/*.spec.ts': ['webpack', 'sourcemap']  // Preprocesujemy pliki specjalne testów za pomocą webpack i sourcemap
    },
    reporters: ['progress', 'kjhtml'],  // Raporty, które chcemy wyświetlić
    port: 9876,               // Port, na którym ma działać Karma
    colors: true,             // Kolorowanie wyników w terminalu
    logLevel: config.LOG_INFO,
    autoWatch: true,          // Automatyczne uruchamianie testów po zmianie plików źródłowych
    singleRun: false,         // Czy Karma ma uruchamiać testy tylko raz i zakończyć, czy ciągle nasłuchiwać na zmiany
    restartOnFileChange: true, // Restartuj Karma po zmianie plików konfiguracyjnych
  });
};
