# CodersCamp 2020 | Projekt Zespołowy | JavaScript
Wykorzystanie asynchronicznego JavaScript oraz korzystanie z REST API.

## Zespół projektowy

Zespół pracował w ramach kursu [CodersCamp](CodersCamp.pl). 
Aplikację wykonali uczestnicy kursu przy pomocy mentora.
Zachęcamy do odwiedzenia profili członków zespołu, w celu zapoznania się z ich portfolio.

**Mentor**: [João Kiakumbo Sebastião](https://github.com/JK-Sebastiao)

**Uczestnicy**:
- [Bartlomiej Kaminski](https://github.com/BartlomiejKaminski)
- [Hubert Siewior](https://github.com/HubertSiewior)
- [Adrian Kotliński](https://github.com/Kotlinski95) (Development Manager)
- [Magdalena Socha](https://github.com/magdalena-socha) (Product Owner)
- [Mateusz Murat](https://github.com/mmurat7) (Tech Lead)
- [Tomasz Smolarski](https://github.com/TomaszSmolarski)

## Star Wars Quiz

W ramach drugiego projektu, zadaniem naszego zespołu było opracowanie quizu z popularnej serii filmów Star Wars. Jest to aplikacja webowa działająca w przeglądarce bez potrzeby instalacji. Językiem domyślnym aplikacji jest język angielski. Sama aplikacja oferuje rozgrywkę w 3 dostępnych kategoriach: 
 - People, 
 - Vehicles, 
 - Spaceships.

### Demo
Wersja demonstracyjna aplikacji jest dostępna [TUTAJ](https://coderscamp2020-joaosebastiao-team.github.io/StarWarsQuiz/).

Powodzenia, niech Moc będzie z Tobą!

![StarWarsQuiz](./static/assets/ui/strona_glowna.png)

### Cel projektu

Celem projektu było dostarczenie aplikacji pozwalającej sprawdzić swoją wiedzę o postaciach, 
pojazdach oraz statkach kosmicznych występujących w Gwiezdnych Wojnach.
Dodatkowo gracz rywalizował z komputerem w trakcie grania w quiz.
Komputer — odpowiadający losowo na pytania

Aplikacja została wykonana wg dostarczonych przez organizatorów CodersCamp wymagań.
Szablon projektu dostępny jest [TUTAJ](https://github.com/CodersCamp2020/CodersCamp2020.Project.JavaScript.StarWarsQuiz).

### Lista funkcjonalności aplikacji

1. Wybór trybu quizu (People, Vehicles, Spaceships) możliwy przed rozpoczciem rozgrywki.
2. Opis zasad dla quizu. Obok zasad pokazuje się losowe zdjęcie z danego trybu (dostosowany opis, jeśli np. imię osoby ze zdjęcia jest w opisie zasad).
3. Po rozpoczęciu gry rozpoczyna się odliczanie czasu (1 minuta).
4. Zadaniem gracza jest odpowiedzieć na jak najwięcej pytań w ciągu ustalonego czasu (dodatkowo gracz konkuruje także z komputerem!). 
5. W trakcie trwania quizu miecz świetlny pokazuje, ile jeszcze czasu zostało. Po wybraniu odpowiedzi zostaje ukazane przez sekundę czy odpowiedź była dobra czy zła. Następnie pytanie zostaje zmienione na kolejne i tak do końca czasu.
5. Pytania są generowane w następujący sposób: 
    - zostaje pobrany losowy zasób z danego trybu (np people o id 5)
    - zostanie pobrane dla wylosowanego zasobu zdjęcie
    - losowane są 3 pozostałe odpowiedzi z zapytania do StarWars API.
6. Po ukończeniu czasu wynik gracza zapisywany jest w rankingu dla danej przeglądarki (LocalStorage) i pokazywany jest ranking 5 najlepszych wyników.


### Wykorzystywane technologie
W trakcie developmentu wykorzystujemy:
- JavaScript
- Web APi dla JavaScript (nie stosujemy żadnych frameworków, czy jQuery)
- CSS, do stylowania aplikacji
- HTML, do definiowania struktury aplikacji
- LocalStorage, do zapisywania najlepszych wyników graczy
- Jest.js do pisania testów jednostkowych
- Fetch, do łączenia z SWApi i oraz pobierania obrazów z zasobów aplikacji
- JSON Server — do działania aplikacji lokalnie, jeśli zostanie wykorzystany limit na zapytania do SWApi

### Działanie aplikacji

#### Menu Główne
W menu głównym należy wybrać tryb gry (domyślnie jest to People):
- People — rozpoznawanie jaka postać z uniwersum Star Wars została wyświetlona
- Vehicles — rozpoznawanie jaki pojazd z uniwersum Star Wars został wyświetlony
- Starships — rozpoznawanie jaki statek kosmiczny z uniwersum Star Wars został wyświetlony

Zadaniem gracza jest odpowiedzieć na jak najwięcej pytań w określonym czasie (1m). Podczas quizu gracz po zaznaczeniu odpowiedzi dostaje informacje o poprawności swojej odpowiedzi poprzez zmianę koloru przycisku na zielony, w przypadku błędnego wyboru przycisk zmienia się na czerwony, natomiast pokazywana jest również poprawna odpowiedź w kolorze zielonym.

Przykładowa dobra odpowiedź na pytanie:

 ![StarWarsQuiz](./static/assets/ui/gra_pytania_dobre.png)
 
Przykładowa zła odpowiedź na pytanie:

 ![StarWarsQuiz](./static/assets/ui/gra_pytania_zle.png)


## Rywalizacja z komputerem

Jednak gracz nie jest pozostawiony sam sobie! Równocześnie z graczem swoją grę rozgrywa komputer, który również zaznacza swoje odpowiedzi kolorem żółtym.

 ![StarWarsQuiz](./static/assets/ui/gra_pytania_komputer.png)

Po upływie zadanego czasu, lub wyczerpaniu puli pytań pokazywany jest ekran zakończenia gry, który zawiera podsumowanie gry i liczbę punktów uzyskanych przez gracza oraz komputer. Dostępny jest także pełny spis kolejno udzielanych odpowiedzi przez gracza i komputer wraz ze wskazaniem właściwej odpowiedzi.

 ![StarWarsQuiz](./static/assets/ui/zakonczenie_gry.png)
 
## Ranking rywalizacji

W aplikacji dostępny jest także ranking, pokazujący wyniki 5 najlepszych graczy w danej przeglądarce:

 ![StarWarsQuiz](./static/assets/ui/ranking.png)
 
Istnieje również możliwość przejścia do listy ze wszystkimi uzyskanymi wynikami w danej przeglądarce:

 ![StarWarsQuiz](./static/assets/ui/ranking_wszyscy.png)

 Jeśli gracz o podanym username istnieje już na liście rankingowej to jego wcześniejszy wynik jest porównywany z obecnym. W przypadku uzyskania lepszego wyniku, jest on nadpisywany.

#### W projekcie każdy z uczestników zaprezentował praktyczną znajomość poniższych zagadnień związanych z JavaScript:
- zmienne
- operatory porównania
- pętle
- obiekty, atrybuty
- warunki
- funkcje
- operatory logiczne
- tablice
- iteracja i/lub rekurencja
- console
- return
- "===" vs "=="
- integracja z zewnętrznym REST API
- interakcja z domem
- odwoływanie się do elementów DOM z JavaScript
- zmiana stylów z poziomu JSa
- zmiana zawartości HTML z poziomu JSa
- animacje
- async await i/lub Promise
- funkcje callback
- pisanie testów jednostkowych 


Zadaniem projektu była realizacja wymagań klienta, z którym konsultowane były wprowadzane funkcjonalności. Utworzona aplikacja jest responsywna (dostosowana do wyświetlania na Tabletach i Telefonach). Wymogiem klienta było nie tylko działanie aplikacji, ale też napisanie testów, w tym celu aplikacja posiada napisanych kilka testżów jednostkowych sprawdzających poprawność napisanych funkcji.


#### Uruchomienie projektu
Aby uruchomić aplikację na lokalnej maszynie, należy wykonać następujące kroki:
1. Zainstalować zależności za pomocą komendy: `npm install`
2. Wystartować serwer developerski `npm run start:dev`

Aplikacja będzie dostępna pod adresem [localhost:8765/index.html](localhost:8765/index.html)
Kod produkcyjny aplikacji umieszczamy w katalogu `src`.

#### Uruchomienie testów
Aby uruchomić testy aplikacji, należy wykonać następujące kroki:
1. Zainstalować zależności za pomocą komendy: `npm install` (jeśli nie zostsało to zrobione wcześniej).
1. Uruchomić testy, wykonując komendę: `npm run test`. Testy z raportem pokrycia mogą być uruchomione za pomocą: `npm run test:cov`.

Kod testów umieszczony został w katalogu `test`.


##### Dodatkowe zadania (wykraczające poza zakres kursu):
1. Do projektu poza wyświetlaniem 5 najlepszych wyników dodaliśmy także wyświetlanie listy wszystkich wyników uzyskanych przez graczy.
2. Projekt został oddatkowo zabezpieczony w przypadku problemów z dostaniem się do Rest API, po zgłoszeniu błędu ze strony API, lub zbyt długim oczekiwaniu na odpowiedź, pytania zostają zaczerpnięte z lokalnych plików .json, aby zredukować czas oczekiwania użytkownika na rozpoczęcie gry.

### Organizacja pracy
Praca zespołu była organizowana przy użyciu narzędzi dostarczanych przez GitHub. 
Zadania opisywaliśmy za pomocą GitHub Issues i dzieliśmy czas ich wykonania na tygodnie za pomocą GitHub Projects.
Każde z zadań było estymowane przez mentora, dzięki czemu staraliśmy się, aby liczba punktów przypadająca w danym tygodniu na każdą osobę w zespole była podobna.
Jeśli chcesz zaproponować, jakąś zmianę w aplikacji, utwórz nowy Issue, wzorując się na poprzednich.
