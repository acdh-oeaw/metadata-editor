# Metadataeditor

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

[technical](technicalDescritption)


# Components

## App

### Imports

* [FundamentNav](#fundamentnav)
* [FundamentFooter](#fundamentfooter)
* [HELPERS](#helpers)

### Description

This is the main Component. It is used to add the three parts of the visible site to the application: the navbar, the content and the footer. As well as setting the owl ontollogy statically via [setOntology](#setOntology).




## Autocomparche

This component is used to create an autocomplete form for searching entries in the Arche Repository on  [getArcheByID](#getArcheByID).
You can specify which endpoint in the api you want to search and also the label. uppon selection an input event is fired (it is not yet bound to v-model! only way to recieve is to listen for events on it. Issue is already filed).

### Imports

* debounce (for handeling a delay of actions)
* [HELPERS](#HELPERS)

### Props


| Prop | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | type of what is looked for. needs to be Capslock valid types and mappings are listed below   |
| name | <code>String</code> | label of v-Select |


type to endpoint Mappings:
``` tobase:https://fedora.hephaistos.arz.oeaw.ac.at/browser/api/
PERSONS: 'persons/',
BASE: '',
ORGANISATIONS: 'organisations/',
PLACES: 'places/',
CONCEPTS: 'concepts/',
PUBLICATIONS: 'publications/',
METADATA: 'getMetadata/',
```

### Methods

#### onSearch

calls the search-function and is from the setup pretty similar to the documentation of v-select found [here](https://sagalbot.github.io/vue-select/docs/Advanced/Ajax.html). It is called in the v-Select.

the function sets loadung(true) and then just calls this.search(loading, search, this);

##### Parameters

| Param | Type | Description |
| --- | --- | --- |
| search | <code>String</code> | The search text typed by the user. |
| loading | <code>Function</code> | Function for triggering the loading class. inside it it is called with<code>true</code>|

##### How to call it

``` template
<v-select label="name" :filterable="false" :options="options" @search="onSearch">...
```
The params come directly from the v-select, no need to write them manually.

#### search

This function calls (350 milliseconds after it was last called) the [getArcheByID](#getArcheByID)-function with the given search and the specified type-prop. on a positve result, the returned search-results are saved to the options-array that is also displayed an the select's options.


##### Parameters

| Param | Type | Description |
| --- | --- | --- |
| loading | <code>Funciton</code> |  Function for triggering the loading class. inside it it is called with<code>false</code> |
|  search | <code>String</code> | text that is searched for |
|  vm | <code>Object</code> | Vue-Object |

##### How to call it

``` inFunction
this.search(loading, search, this);
```






## DummyComponent

### Imports

* [FundamentNav](#fundamentnav)
* [FundamentFooter](#fundamentfooter)
* [HELPERS](#helpers)

### Description

This is the main Component. It is used to add the three parts of the visible site to the application: the navbar, the content and the footer. As well as setting the owl ontollogy statically via [setOntology](#setOntology).

### Methods

#### Dummy

##### Parameters

| Param | Type | Description |
| --- | --- | --- |
| lorem | <code>String</code> &#124; <code>Array</code> | does stuff |

##### Description

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
