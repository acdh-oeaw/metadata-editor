# metadataeditor

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
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
### Methods
#### Dummy
##### Parameters

| Param | Type | Description |
| --- | --- | --- |
| lorem | <code>String</code> &#124; <code>Array</code> | does stuff |

##### Description
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
<<<<<<< RobinDocs

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
Removes the .ttl file from your scope.

## Start
Acts as the landing page of the MetaDataEditor. You can use it to navigate through the whole Website.

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
## Load
This Component is used to load .ttl files into the scope. Once you select a file, it is auto loaded and you can immediately select a new file to be loaded into the scope.
### Imports
* [HELPERS](#helpers)
 * [tripleCount](#tripleCount)
 * [StringToStore](#StringToStore)
## FundamentNav
The header of the website, you can use it to navigate between different pages.
## FundamentFooter
Located at the bottom of every page, the FundamentFooter component contains some legal information as well as some links.
## Fundamententity
=======
Located at the bottom of every page, the FundamentFooter component contains some legal information as well as some links.
>>>>>>> local
