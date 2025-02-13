# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.1](https://github.com/cssninjaStudio/vulk/compare/v2.0.0...v2.0.1) (2023-10-31)


### Bug Fixes

* add seo meta examples ([e8e31c9](https://github.com/cssninjaStudio/vulk/commit/e8e31c93d9621b1c002dd3e5162d3e4eaa1e4f48))
* node engine, charset and seo image size ([53652d7](https://github.com/cssninjaStudio/vulk/commit/53652d72ad4861944f954cbb99156be4dc8ec5c9))
* optional image and url config + expose VITE_APP_URL env variable ([fd827f5](https://github.com/cssninjaStudio/vulk/commit/fd827f51c0c10e517cc03d8ec297ba75d0037bf1))
* update vite 5 beta + update packages + build issue ([90ae9da](https://github.com/cssninjaStudio/vulk/commit/90ae9daeddf2169b541926203889fcd07c158487))

## [2.0.0](https://github.com/cssninjaStudio/vulk/compare/v1.4.0...v2.0.0) (2023-09-21)


### ⚠ BREAKING CHANGES

* **ActionLink:** remove default label value + add icon property + allow using default slot
* **DarkImage:** remove darkmode store usage to let css display images
* create app.config.ts file, remove useLayout, replace darkmode cookie with localstorage

### Features

* **ActionLink:** remove default label value + add icon property + allow using default slot ([29d2688](https://github.com/cssninjaStudio/vulk/commit/29d26886d3b515e3a8dee867a580f1f5f06431e3))
* allow to change logo in app.config.ts ([46cfc68](https://github.com/cssninjaStudio/vulk/commit/46cfc68217bcbaf312b45916f4d50e6a55b55f63))
* **CenterdMedia:** add default slot ([77893f0](https://github.com/cssninjaStudio/vulk/commit/77893f0e5dc45690737350cf8e2f8b2e23bdc0ee)), closes [#42](https://github.com/cssninjaStudio/vulk/issues/42)
* **CompanyGrid:** add subtitle property ([7eb37be](https://github.com/cssninjaStudio/vulk/commit/7eb37be118a4ef4bc8ef52af7db8fbea49f37904)), closes [#47](https://github.com/cssninjaStudio/vulk/issues/47)
* create app.config.ts file, remove useLayout, replace darkmode cookie with localstorage ([cc0b77d](https://github.com/cssninjaStudio/vulk/commit/cc0b77d95861da68744ae1715915f0adcae4d85a))
* **DarkImage:** remove darkmode store usage to let css display images ([6f1f417](https://github.com/cssninjaStudio/vulk/commit/6f1f41741d5fb87b9703890d95efc07999a209b2))
* **demo:** add intermediate pages listing ([eaaa58b](https://github.com/cssninjaStudio/vulk/commit/eaaa58b24afd5994d56e7340b4b7ba2adc6179eb))
* improve ssr + expose h3 event to ssr context ([4adeb3e](https://github.com/cssninjaStudio/vulk/commit/4adeb3e6f4ddc7dcac67b2845b7574239dc96003)), closes [#37](https://github.com/cssninjaStudio/vulk/issues/37) [#35](https://github.com/cssninjaStudio/vulk/issues/35) [#36](https://github.com/cssninjaStudio/vulk/issues/36)
* **Placeholder:** allow using slots ([7724fc4](https://github.com/cssninjaStudio/vulk/commit/7724fc46694ca34fda20efa87e3978eb6f3a8c32))
* **PlaceholderSection:** allow using slots ([6c24aec](https://github.com/cssninjaStudio/vulk/commit/6c24aec48a62a6b14c117512dca96c83812e3bf9))
* **Subtitle:** add text property + use dynamic component ([c4286c3](https://github.com/cssninjaStudio/vulk/commit/c4286c37207920328cc50e6659922bc26659f20f)), closes [#55](https://github.com/cssninjaStudio/vulk/issues/55)
* **Title:** add text property + use dynamic component ([a815da2](https://github.com/cssninjaStudio/vulk/commit/a815da2fba3c1eb2de9a8403a0de56b28e101667)), closes [#54](https://github.com/cssninjaStudio/vulk/issues/54) [#55](https://github.com/cssninjaStudio/vulk/issues/55)
* use variable fonts from fontsources ([93bab45](https://github.com/cssninjaStudio/vulk/commit/93bab45d1920cad0c63031a13b77f8eac8e87b21))


### Bug Fixes

* add SSR comment in dockerfile ([000606e](https://github.com/cssninjaStudio/vulk/commit/000606e73240a2f7a1560c000a9810a0bbb85476))
* **ContentBlockB:** tooltip border ([7cb500f](https://github.com/cssninjaStudio/vulk/commit/7cb500fc80ca646e315e7551ec5781070b17fdd4))
* **eslint:** parse ts files ([2e7f54a](https://github.com/cssninjaStudio/vulk/commit/2e7f54a94ca0fa8de6fdc4fd8def3aac09d0e0ed)), closes [#62](https://github.com/cssninjaStudio/vulk/issues/62)
* minify html output on ssr/ssg ([4776898](https://github.com/cssninjaStudio/vulk/commit/477689803ab4222c348b9f8952ff604c4ac897dc))
* **Modal:** make title props optional ([06759ac](https://github.com/cssninjaStudio/vulk/commit/06759ac4e8ce88324e30517f72e37db9513bd7a3))
* move gtm id to env ([572f9fc](https://github.com/cssninjaStudio/vulk/commit/572f9fc1fcb3cbe70799fced47126d88692f9f22)), closes [#53](https://github.com/cssninjaStudio/vulk/issues/53)
* replace .env with .env.example ([e22a460](https://github.com/cssninjaStudio/vulk/commit/e22a460ba14037eed76a3ac70bef2fb1fd63111c))
* **Tag:** make label props optional ([4894e2e](https://github.com/cssninjaStudio/vulk/commit/4894e2e6f9fbdab80d2519f93cfd61d0f835a183))
* **ThemeToggle:** initial dark mode state ([f55bfa6](https://github.com/cssninjaStudio/vulk/commit/f55bfa6f5656f7f27ed346f4e81a0246221928e2))

## [1.4.0](https://github.com/cssninjaStudio/vulk/compare/v1.3.1...v1.4.0) (2023-08-04)


### Features

* improve SSR and PWA ([341eafe](https://github.com/cssninjaStudio/vulk/commit/341eafee5a828d1c099ef0c81d7171c13ed01e9d))
* replace @vueuse/head with unhead ([0a171a9](https://github.com/cssninjaStudio/vulk/commit/0a171a97e8c62906153cde7af4e81ed22ac01ba2))
* upgrade dependencies - replace vite-plugin-fonts with unplugin-fonts ([7f46d7e](https://github.com/cssninjaStudio/vulk/commit/7f46d7e921f214db529ecadd3db9b488dc6d8e1b))
* upgrade prettier and linter configuration ([682f075](https://github.com/cssninjaStudio/vulk/commit/682f075e026ae74d3e13985bb60d0de37658b2fe))

### [1.3.1](https://github.com/cssninjaStudio/vulk/compare/v1.3.0...v1.3.1) (2023-06-26)


### Bug Fixes

* **Footer:** use raw router links in column ([cad4d6c](https://github.com/cssninjaStudio/vulk/commit/cad4d6cdf87877a744ca6976a25267729ae34c0f))
* improve navbar keyboard navigation ([5cbfa32](https://github.com/cssninjaStudio/vulk/commit/5cbfa3290345c5678b9e9a6737ea1d82c4b0c6a7))
* mobile megamenu ([01696d5](https://github.com/cssninjaStudio/vulk/commit/01696d58bcd4cb91957a53aa7c7d436703def951))
* **ssg:** transorm windows paths for fast-glob ([96553d0](https://github.com/cssninjaStudio/vulk/commit/96553d061984f671689dbf899a8610698eb9ed96))

## [1.3.0](https://github.com/cssninjaStudio/vulk/compare/v1.2.0...v1.3.0) (2023-02-21)


### Features

* add SSG build option + define package as module ([10f353f](https://github.com/cssninjaStudio/vulk/commit/10f353f0918adc8f22e9b6f16a7f49d11de573f5))
* **ssr:** improve perfs with optional shared cache ([27253a3](https://github.com/cssninjaStudio/vulk/commit/27253a3ec78fb54126581d637db3f5da390c66e0))
* update discord url ([80fb173](https://github.com/cssninjaStudio/vulk/commit/80fb173d793674b8f83e9051136cba2838ad05b1))
* update to vite 4 and improve accessibility ([705f10b](https://github.com/cssninjaStudio/vulk/commit/705f10bc4943ac891b0a46b32b723d5d748b3b55))

## [1.2.0](https://github.com/cssninjaStudio/vulk/compare/v1.1.0...v1.2.0) (2022-10-09)


### Features

* add router scrollBehavior ([3990cdd](https://github.com/cssninjaStudio/vulk/commit/3990cddb8bb3d09869bb77a6c60037d75d783e80))
* add ssr as an optional feature ([5dcaba6](https://github.com/cssninjaStudio/vulk/commit/5dcaba6206d50f7c9430304ea239d032e4b01a56))
* add vite auto-import plugin ([589829f](https://github.com/cssninjaStudio/vulk/commit/589829f0c4d55cca0ff42b6a5e174a381bbeea13))
* pre-optimize assets script, remove vite imagemin plugin ([20ede43](https://github.com/cssninjaStudio/vulk/commit/20ede43f97dcc21364a6b2b0bc1c7392f7a102ee))
* **ssr:** use compatibility events from h3 ([00166d4](https://github.com/cssninjaStudio/vulk/commit/00166d4a3504853c1df1d3411777c85315448023))
* upgrade to vite 3 ([71dd8ec](https://github.com/cssninjaStudio/vulk/commit/71dd8ec6040a31ca873cbb2133d5b64bdcf13449))


### Bug Fixes

* **checkbox:** allow to use any value ([6195315](https://github.com/cssninjaStudio/vulk/commit/6195315f39a8f3bafc12f499041ff405e8ae40f9))
* gallery a default item size ([aca2c9b](https://github.com/cssninjaStudio/vulk/commit/aca2c9bd1fd1caef3114c44dd5290b7d2dc4fdd7))

## 1.0.0 (2022-03-05)


### Features

* add about pages ([cfccb68](https://github.com/cssninjaStudio/vulk/commit/cfccb68079d2b713b7118a8e2a8bfcf0f85734b3))
* add accesibility keyboard events ([f575938](https://github.com/cssninjaStudio/vulk/commit/f575938683f54a1c24221d694098aec19a026c97))
* add advanced components ([8c29040](https://github.com/cssninjaStudio/vulk/commit/8c29040ee714f9f4f2dd3c0371cd2b0e644f51ee))
* add base components, add feature blocks ([1fd0442](https://github.com/cssninjaStudio/vulk/commit/1fd0442421a3c2f152bc56d99eac37a138d46c94))
* add blog posts ([8b92b71](https://github.com/cssninjaStudio/vulk/commit/8b92b71edd71b7968f3a3a98db265c7e0039ad11))
* add component hub ([a2c57af](https://github.com/cssninjaStudio/vulk/commit/a2c57afeaefbb3a582d75f507e345b8509bd1102))
* add contact, terms and error pages ([4624591](https://github.com/cssninjaStudio/vulk/commit/4624591e1e523bd32574fb03601bc926a0d1aa23))
* add cta block ([1fcdc0b](https://github.com/cssninjaStudio/vulk/commit/1fcdc0b5f556fcf7996b64c9f44bcee42c646d13))
* add cta blocks docs ([220abe4](https://github.com/cssninjaStudio/vulk/commit/220abe4641cb09d131cc6df334e1669166d37e7c))
* add DarImage component ([89fc0e5](https://github.com/cssninjaStudio/vulk/commit/89fc0e5829c467b8a166e19f4a88b0967468bc95)), closes [#6](https://github.com/cssninjaStudio/vulk/issues/6)
* add feature and content blocks inverted props ([dd5d2b7](https://github.com/cssninjaStudio/vulk/commit/dd5d2b7520c6e6f96d3113608811551eb248ac67))
* add feature blocks ([47227ca](https://github.com/cssninjaStudio/vulk/commit/47227ca1eb6365c713cdbec7d1befcd198950de4))
* add final landing pages ([5f771b4](https://github.com/cssninjaStudio/vulk/commit/5f771b4dba626e2f81732d1b1f9167cb41adde8b))
* add footer and content docs ([45e9f7b](https://github.com/cssninjaStudio/vulk/commit/45e9f7bc000984e5715ab89df56050227a0fda3a))
* add form components and documentation ([f76ee0b](https://github.com/cssninjaStudio/vulk/commit/f76ee0b923a70f54c73bcc17ca0219cd92350a40))
* add hamburger component, favicon ([32ffe94](https://github.com/cssninjaStudio/vulk/commit/32ffe9482ccd28df14cb810e45bd7b39f2d817d5))
* add help center ([0074fde](https://github.com/cssninjaStudio/vulk/commit/0074fde770dc10079316bb83229f6508f8713325))
* add homepage sections ([c34fa52](https://github.com/cssninjaStudio/vulk/commit/c34fa5224b6d1fdf56108f5a33d4d54b96b206b1))
* add icon, image and typography documentation ([cd2b6e5](https://github.com/cssninjaStudio/vulk/commit/cd2b6e55ea1631412f37e8d1d0fabb5b8a39a6c1))
* add landing 13,14,15 ([a2ccb7f](https://github.com/cssninjaStudio/vulk/commit/a2ccb7f4ca4d16ba21843844e503b7dd42e3712a))
* add landing 16,17,18 ([c5befbc](https://github.com/cssninjaStudio/vulk/commit/c5befbc55fcdafc5ec61169de0f53e53aada22e3))
* add landing 19 and 20 ([29b35a9](https://github.com/cssninjaStudio/vulk/commit/29b35a97462d921106d4c5c7b68c3bdfea194877))
* add landing 21 ([6405a32](https://github.com/cssninjaStudio/vulk/commit/6405a32e8f03d34158ab7257faa3317ba5368c18))
* add landing 22, add map component ([b8e660e](https://github.com/cssninjaStudio/vulk/commit/b8e660ec77df664ff78a6f4bed41f58b9072f0ff))
* add landing 23 to 30 ([4450453](https://github.com/cssninjaStudio/vulk/commit/4450453abb6cf0a223cf0160a65ddc7635a90935))
* add landing 31, 32, 33 ([81d3a09](https://github.com/cssninjaStudio/vulk/commit/81d3a0979bb288e4dc61886e4a5648e097417f46))
* add landing 34, landing 35 ([b64e01e](https://github.com/cssninjaStudio/vulk/commit/b64e01e1dbc15fbdd50edc41cab17d83edffdbd1))
* add landing 5 ([6d6a3dd](https://github.com/cssninjaStudio/vulk/commit/6d6a3dd09c51dcdb66d4adbde5939ce2b1e14e6f))
* add landing 6 (wip) ([721ed4c](https://github.com/cssninjaStudio/vulk/commit/721ed4c63aee56539b19fb4ac68920913dedc9d8))
* add landing 6 and 7 ([3d30140](https://github.com/cssninjaStudio/vulk/commit/3d30140619e05a54e7c819d087922708ff5e4e5e))
* add landing 8 and 9 ([1ad861a](https://github.com/cssninjaStudio/vulk/commit/1ad861afbb46e4aac16c8e68230ac7f7e14e888d))
* add landing 8 and 9 ([42a5ca3](https://github.com/cssninjaStudio/vulk/commit/42a5ca3f77d6545d027cfcce8ff6e236d4b0a935))
* add landing page 8 (wip) ([cfc5175](https://github.com/cssninjaStudio/vulk/commit/cfc5175030f1459c6fe202c41fd79f457b5a7db5))
* add landing-4 ([38a1515](https://github.com/cssninjaStudio/vulk/commit/38a1515425624ae85ce49decde0dfe96d4c95cfe))
* add master layouts demos ([c395682](https://github.com/cssninjaStudio/vulk/commit/c3956822290c4978a3b5ea730e36cb2529cb8e6d))
* add modal component ([0dfd63e](https://github.com/cssninjaStudio/vulk/commit/0dfd63ec93b79b5fa108b55ef5699d056a4df098))
* add navbar components, work in progress ([8a91f0d](https://github.com/cssninjaStudio/vulk/commit/8a91f0d49830fe1c5b441e348058eb712d4051a0))
* add new pricing pages ([467e824](https://github.com/cssninjaStudio/vulk/commit/467e8243c991c2de2b401379324c3ef416d28ccf))
* add new pricing pages ([c9791dd](https://github.com/cssninjaStudio/vulk/commit/c9791ddffed03a7a2c6ae4f0aa071bfccf3a4952))
* add pinia and install i18n ([8d4a2e0](https://github.com/cssninjaStudio/vulk/commit/8d4a2e060e61672eb5deaabc6702f1aaf736a2f3)), closes [#3](https://github.com/cssninjaStudio/vulk/issues/3)
* add placeholder, tags and card docs ([dbf63a5](https://github.com/cssninjaStudio/vulk/commit/dbf63a5ab2c4418c29971b36f2548b91aabb65ea))
* add popper component ([fe03191](https://github.com/cssninjaStudio/vulk/commit/fe031911a729b9a9a71b3777c02471251e8eb9ab))
* add product homepage ([5710f80](https://github.com/cssninjaStudio/vulk/commit/5710f80a0333ce08643bd67ebd4e60285e8e66d5))
* add quickstarter builder ([bf5463c](https://github.com/cssninjaStudio/vulk/commit/bf5463c076482f863fbf2d38cb6ee21c360ad058))
* add quickstarter builder ([171e360](https://github.com/cssninjaStudio/vulk/commit/171e360b9ac13cfd80dc15bd16605722dc92fb8b))
* add raw Html components ([6a6391a](https://github.com/cssninjaStudio/vulk/commit/6a6391ac0b35b8a1425416af70376d2289c5ebfe))
* add raw html from bold ([56008c9](https://github.com/cssninjaStudio/vulk/commit/56008c9e7b4fc2e48e1af1cb1b0ba7e753edc12e))
* add remaing blog pages ([11462ca](https://github.com/cssninjaStudio/vulk/commit/11462ca5cdd31cbd49274f50837295c64f5ce27a))
* add slots in mosts of components ([5ec763a](https://github.com/cssninjaStudio/vulk/commit/5ec763ade20ff748f01499dfc986b8ffc92259cc)), closes [#5](https://github.com/cssninjaStudio/vulk/issues/5)
* add ssr ([59f0b92](https://github.com/cssninjaStudio/vulk/commit/59f0b92784d61650e8aa74be4763d2d37ab39031))
* add subpages ([bdc2029](https://github.com/cssninjaStudio/vulk/commit/bdc2029ab1a9139099c9d867194e885ffeacd58a))
* add table docs ([7190a39](https://github.com/cssninjaStudio/vulk/commit/7190a3906a0260e4b35f521c0715b3f34fd47263))
* add team blocks ([1f26b5e](https://github.com/cssninjaStudio/vulk/commit/1f26b5e7a5be209d377818b78ea8e837e8e5d6e8))
* add team blocks ([4493212](https://github.com/cssninjaStudio/vulk/commit/44932128a3e48a32f2b349ff5b22525922e33d44))
* add testimonial blocks ([992c41e](https://github.com/cssninjaStudio/vulk/commit/992c41e57e962f011c2c77fa1d2a3c1b2cc11c76))
* add video and section documentation ([0695c7d](https://github.com/cssninjaStudio/vulk/commit/0695c7dcc53a4e3dba13e8d4f615315d087b0a40))
* advanced components refactor ([bf1b103](https://github.com/cssninjaStudio/vulk/commit/bf1b103800d6bdcd6602f513f3f17a7841f1ac85))
* auth pages responsive ([f5c36bf](https://github.com/cssninjaStudio/vulk/commit/f5c36bf25d091f78a2200931dbbbb98e5e0871a7))
* clean data, landing pages and heros, implement missing components ([831a522](https://github.com/cssninjaStudio/vulk/commit/831a522ef616e397194c2fba546a95b0c9780059))
* content blocks, feature blocks improvements ([89a417a](https://github.com/cssninjaStudio/vulk/commit/89a417a1523345031fac20d9d93e99c0d552fd20))
* convert ssr to use unjs packages (jiti, h3, lishten) ([42a3df3](https://github.com/cssninjaStudio/vulk/commit/42a3df31d4c993dae50515ee6ef81f2515deeb9d))
* finish dark mode, fix layout bugs, responsiveness ([263b54f](https://github.com/cssninjaStudio/vulk/commit/263b54fc9926c3553ab79b5eb1c28e114763ca93))
* fix checkbox component, fix stacked section ([4af1c07](https://github.com/cssninjaStudio/vulk/commit/4af1c075860d11cd73a297b78d01dc56dde4b74b))
* fix hero headers on responsive devices ([a41c9e8](https://github.com/cssninjaStudio/vulk/commit/a41c9e84c3be6b45d1870afaa5eb2cfbf04a5068))
* fix textarea ([472cda5](https://github.com/cssninjaStudio/vulk/commit/472cda51e879d500ffeec202ab469ec9ec5919bf))
* fixed build ([f7e783f](https://github.com/cssninjaStudio/vulk/commit/f7e783f8a7d5180eda2f05a6b4afb2cbaf09587a))
* gallery blocks ([48c21fa](https://github.com/cssninjaStudio/vulk/commit/48c21fa8f75fcbaff3482700d359ca94160037ae))
* initial commit ([4cf05ca](https://github.com/cssninjaStudio/vulk/commit/4cf05ca00e7d4b0002b84afae7ff4b5a9e1921a8))
* new cta blocks ([571386c](https://github.com/cssninjaStudio/vulk/commit/571386cf9bcb33d091e8662ee904b117df47228b))
* nuxt-like plugin system ([37b2f54](https://github.com/cssninjaStudio/vulk/commit/37b2f54147165d62a40d73b829516f0bf7dea0d3))
* refactor data paths ([cab2d35](https://github.com/cssninjaStudio/vulk/commit/cab2d35cb5ca4b10eee09c590075d90605f10e24))
* refactor docs (wip) ([8c0dd9a](https://github.com/cssninjaStudio/vulk/commit/8c0dd9a3a44fd9a8a2b64d179183636051b65e3f))
* refactor docs (wip) ([3965e21](https://github.com/cssninjaStudio/vulk/commit/3965e218983f8df4dad8f456480b5a256fdb1e76))
* refactor docs (wip) ([5b49e55](https://github.com/cssninjaStudio/vulk/commit/5b49e554fee537898e0226a39a3db8187ce2b11e))
* refactor docs (wip) ([d0c7eca](https://github.com/cssninjaStudio/vulk/commit/d0c7ecad8ca85cbb8384bfcae75991cb893db007))
* refactor docs (wip) ([b7b2c26](https://github.com/cssninjaStudio/vulk/commit/b7b2c268901b1c3dc0eb0217aaf94251610ea41f))
* refactor docs (wip) ([37a5501](https://github.com/cssninjaStudio/vulk/commit/37a55019b007d812bb490c59e434b3a76ad16347))
* refactoring vulk docs (wip) ([9ab1847](https://github.com/cssninjaStudio/vulk/commit/9ab1847a5bdc444ac784ee06dcea20833cb18119))
* setup documentation, add avatar documentation ([276d414](https://github.com/cssninjaStudio/vulk/commit/276d414dfd4ca887a50c5f475c111a4478f784d9))
* small bug fixes ([612122e](https://github.com/cssninjaStudio/vulk/commit/612122e69cf0686df8380f7e35b1b00219598287))
* small bug fixes ([3bdcb7a](https://github.com/cssninjaStudio/vulk/commit/3bdcb7a67874b79582a9b02933709ecd3fe1dbdc))
* tabs component and fix block L ([01b3ad3](https://github.com/cssninjaStudio/vulk/commit/01b3ad3db5b0bcee34fc43bda1084c8736f79c49))
* updated component library ([ca4a687](https://github.com/cssninjaStudio/vulk/commit/ca4a687421888633bd92dbf0abdd5eeb4dfd1412))
* updated nav links ([bc0f764](https://github.com/cssninjaStudio/vulk/commit/bc0f76492ae9fad578d6e0ffb3243cba6104f91f))
* useLayout auto detect available layouts ([5cec90c](https://github.com/cssninjaStudio/vulk/commit/5cec90c8b4acb75d2863b22733284fb65bfdcdad))
* work on landing 21 ([e7a52b9](https://github.com/cssninjaStudio/vulk/commit/e7a52b9fb3fa5e90c4e967ee45106c030cac6d7d))
* work on landing 21 ([e66ab62](https://github.com/cssninjaStudio/vulk/commit/e66ab62a15d6ae863071c3d88d6c642f1a1f0d17))


### Bug Fixes

* add purge icon ([a515bf2](https://github.com/cssninjaStudio/vulk/commit/a515bf257a2b4045d6520ea16bd68e94fb4cd0ec))
* blog dark mode ([0c72239](https://github.com/cssninjaStudio/vulk/commit/0c722392d506017ceef59c9262c6ce78ca8fa766))
* documentation thumbnails ([c47c58b](https://github.com/cssninjaStudio/vulk/commit/c47c58b361e2df96b3662cffa5200d5ef9a310ba))
* missing links ([ad72b3d](https://github.com/cssninjaStudio/vulk/commit/ad72b3dec3a2de044639a55ff133a50726665fee))
* remame table components [#7](https://github.com/cssninjaStudio/vulk/issues/7) ([185719e](https://github.com/cssninjaStudio/vulk/commit/185719e9ed7f428870b3cd2e8ff93faac79c5f59))
* replace themeState with useDarkmode ([97e3cdd](https://github.com/cssninjaStudio/vulk/commit/97e3cdd38627f8c6e1e01dfe732f5b642c2ffa36)), closes [#2](https://github.com/cssninjaStudio/vulk/issues/2)
* Typescript errors ([b35afb3](https://github.com/cssninjaStudio/vulk/commit/b35afb30a50613c869f10dfebec244040ca06407))
* unused vite variable and undeclared module ([1a3e631](https://github.com/cssninjaStudio/vulk/commit/1a3e6311ee66840c9060a1963d40536dbe81cab3))
* use import on dynamic data to bundle assetss ([49b342a](https://github.com/cssninjaStudio/vulk/commit/49b342af08923d499348aa1a70f34849851b4e23)), closes [#4](https://github.com/cssninjaStudio/vulk/issues/4)
