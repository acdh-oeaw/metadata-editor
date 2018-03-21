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

## Create

A content-level component cointaining the functionallity to write new meta data entries to the triple store of the application and in the future to also upload those to the server. for that reason it contains the [FormFromSchema](#FormFromSchema)-component.

### Imports

* [Fundamententity](#fundamentnav) (never called)
* [Autocomparche](#Autocomparche)
* [FormFromSchema](#FormFromSchema)
* [HELPERS](#helpers)



## Entities

Display-component to show the entities that are in the [n3-store-module](#n3).

### Imports

* [HELPERS](#helpers)


### Methods


### Uses Foreign Methods
* [onFileChange](#onFileChange)
* [loadTtl](#loadTtl)
* [tripleCount](#tripleCount)
* [StringToStore](#StringToStore)


## Entitytable

Displays a reactive table of search results from jowl-data.
Currently not in use, so it is uncertain if described behavior is correct.

### Props

| Props | Type | Description |
| --- | --- | --- |
| uri | <code>String</code>| the query that is searched for. each time it changes, the table is updated. |

### Imports

* [HELPERS](#helpers)

### Data

* <code>tabledata: []</code> -> array of objects in form of <code>{name: '', type: '', range: ''}</code>.
Its content gets displayed in the table.

### Methods

#### getProps

This is a watcher-function of the uri-prop.
it clears the tabledata-object, then calls [fetchPropertiesByURI](#fetchPropertiesByURI) and pushes the returned data with proper attribute names to the tabledata-object.  

##### Parameters

| Param | Type | Description |
| --- | --- | --- |
| newClass | <code>String</code> | uri to be fetched from |



### Uses Foreign Methods

* [fetchClasses](#fetchClasses)
* [fetchSubClassOf](#fetchSubClassOf)
* [fetchPropertiesByURI](#fetchPropertiesByURI)
* [getQuery](#getQuery)


## FormFromSchema

This component renders a full form from a given type.
On created it calls [getMetadataByType](#getMetadataByType) with the as a param specified type. The returned schema is  stored in the [JSONschema module](JSONschema), which is also mapped to the state of this component. the schema is used as the param schema for form-schema, which is the imported component that actually does the rendering of the form.

Validation rules and specific mappings of schema-elements to form-elements can be described in the sript part. (in the future, when the api returns typing, we will improve the current version to support other types then String.)


### Used in

* [Create](#create)

### Imports


* [FormSchema](https://github.com/formschema) (external component)
* [Autocomparche](#Autocomparche)
* [HELPERS](#HELPERS)


### Props


| Prop | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | type of the form you want to render. this is directly used as a parameter for calling [getMetadataByType](#getMetadataByType) |


#### Possible types
* person
* organisation
* place
* concept
* publication

### Components

* [FormSchema]((https://github.com/formschema)
* [Autocomparche](#Autocomparche)



### Uses Foreign Stuff

#### Methods
* [setSchema](#setSchema)
* [setEntry](#setEntry)
* [objectToStore](#objectToStore)
* [getMetadataByType](#getMetadataByType)

#### Data
* schema from [JSONschema](JSONschema) -> in combination with [type] the correct schema is received.


### Methods

#### submit

called without parameters after the submit-button at the end of the form is clicked.
it calls [objectToStore](#objectToStore) with the model from [FormSchema]((https://github.com/formschema) and shema of from the

##### Parameters

none

### How to call it

``` template
<FormFromSchema type="person"></FormFromSchema>
```
instead of person you can type any other of the possible [types](#Possible-types).


## Fundamententity

Dispalys a bootstrap card of an entity from a given uri, type and format.
TODO: I think it is relevant for searching the api and instantly loading data from eg. viaf.

It does all it's functionallity in created, so it is not reactive after the content has loaded.

!!!! ------------------------------- More info is needed---------------------------------!!!


### Used in

* [Create](#create) (only imported, never called)
* [Entities](#Entities)
* [Load](#load)

### Imports

* [HELPERS](#HELPERS)


### Props




| Prop | Type | Description |
| --- | --- | --- |
| uri | <code>String</code> | the address from where you want to display additional data. eg (https://viaf.org/something). posible uris are (viaf.org and id.acdh.oeaw.ac.at)  |
|type | <code>String</code> | as far as I can tell only relevant, if the address is (https://id.acdh.oeaw.ac.at). then it is one of the types shown [here](#possible-types-1).  |
|format | <code>String</code> | is not used in the code. |


### Components

none



### Uses Foreign Stuff

#### Methods
* [setSchema](#setSchema)
* [extractHostname](#extractHostname)
* [getViafByID](#getViafByID)
* [getArcheByID](#getArcheByID)

### Data
* <Code>entity: { title: 'loading', desc: 'loading', type: '' }</Code>
* <Code>loading: true</Code>

### How to call it

``` exampleFromEnteties
<Fundamententity v-if='entity.type == "acdh:Person;"'
  :uri='entity["acdh:hasIdentifier"][0]'
  type='PERSONS'>
 </Fundamententity>
```
instead of acdh:Person you can use any other of the possible [types](#Possible-types) similarly as well as <Code>type='PERSON'</Code>.
## FundamentFooter
Located at the bottom of every page, the FundamentFooter component contains some legal information as well as some links.
## FundamentNav
The header of the website, you can use it to navigate between different pages.
## Load
This Component is used to load .ttl files into the scope. Once you select a file, it is auto loaded and you can immediately select a new file to be loaded into the scope.
### Imports
* [HELPERS](#helpers)
 * [tripleCount](#tripleCount)
 * [StringToStore](#StringToStore)

## Propertytable
A simple table which shows all properties of a given ontology.
### Imports
* [HELPERS](#helpers)
* [fetchClasses](#fetchClasses)
* [fetchSubClassOf](#fetchSubClassOf)
* [fetchPropertiesByURI](#fetchPropertiesByURI)
* [getQuery](#getQuery)
### Watchers
#### getProps
Loops through all given properties and adds them to the table.
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| newClass | <code>String</code> | URI of the new Ontolgy you want to load into the store |

## Schema
Schema helps you explore your ontology by showing you the properties of every class in your schema.
### Imports
* [Propertytable](#Propertytable)
* [HELPERS](#helpers)
 * [fetchClasses](#fetchClasses)
 * [fetchSubClassOf](#fetchSubClassOf)
 * [fetchPropertiesByURI](#fetchPropertiesByURI)

### Props

| Prop | Type | Description |
| --- | --- | --- |
| uri | <code>String</code> | URI of the ontology that is to be used. |

### Components
* [Propertytable](#Propertytable)

### Methods
#### getClasses
Returns the classes from your ontology if the Base URI matches 'https://vocabs.acdh.oeaw.ac.at/schema#'
##### How to call it
``` template
<option v-for="cl in getClasses()" :value="cl['?x'].URI">{{ cl['?x'].name }}</option>...
```
### Computed
#### getOntology
Retrieves the ontology out of the store, fetches the classes if your store is not read yet.

## Start
Acts as the landing page of the MetaDataEditor. You can use it to navigate through
## Store
This component is used to load external .ttl files into the store. You can upload any .ttl file as long as it's structure is supported. The assigned methods will automatically called upon selecting your file and the content of it will be stored.
### Imports
* [Load](#load)
* [Entities](#entities)
* [HELPERS](#helpers)
 * [tripleCount](#tripleCount)
 * [StringToStore](#StringToStore)

### Components
* [Load](#load)
* [Entities](#entities)

### Methods
#### onFileChange
This function is called as soon as a file gets selected, it checks if the used file is valid and then calls [loadTtl](#loadTtl).
#### loadTtl
Loads and reads valid .ttl files, then loads them into the store.
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| file | <code>file</code> | The file loaded into the scope. |
#### removeTtl
Removes the .ttl file from your scope.the whole Website.
