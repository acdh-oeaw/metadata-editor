# Store
## Jowl
### Actions
#### setOntology
Sets the store ontology to jOwl and the ontology path to a specified path.
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path where the ontology is located |
##### Commits
* [startProcessing](#startProcessing)
* [setOntologyPath](#setOntologyPath)
* [setOntology](#setOntology)
* [stopProcessing](#stopProcessing)

#### makeQuery

## N3
### Actions
#### AddTriple
Adds a triple object to the store.
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| triple | <code>Object</code> | The triple object added to the store |
##### Commits
* [updateTripleCount](#updateTripleCount)
* [updateSubject](#updateSubject)

#### AddFilteredTriple
Calls the [RemovePrefix](#RemovePrefix) function on the subject and object of the triple to remove the prefixes n3.js automatically adds when parsing blank namespaces before adding it to the store using [AddTriple](#addTriple).
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| triple | <code>Object</code> | The triple which is being worked on |
#### StringToStore
High level action parsing a .ttl file into triples and subsequently saving them to the store.
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | The string which is being parsed |
##### Commits
* [startProcessing](#startProcessing)
* [updateTripleCount](#updateTripleCount)
* [updateSubject](#updateSubject)
* [stopProcessing](#stopProcessing)

##### Dispatches
* [AddFilteredTriple](#AddFilteredTriple)

#### objectToStore
High level action parsing a JS-object into triples and subsequently saving them to the store.
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| schema | <code>Object</code> | Schema object containing the type of the subject |
| obj | <code>Object</code> | Object containing the keys and values of the triple to be added |
##### Commits
* [startProcessing](#startProcessing)
* [increaseCounter](#increaseCounter)
* [updateTripleCount](#updateTripleCount)
* [updateSubject](#updateSubject)
* [stopProcessing](#stopProcessing)

##### Dispatches
* [AddTriple](#AddTriple)

### Mutations
#### updateTripleCount
Updates the triple counter with the current triple count.
#### increaseCounter
Increases the counter used to give subjects unique IDs by one.
#### updateSubject
Fetches all subjects and corresponding objects for which the predicate is http://www.w3.org/1999/02/22-rdf-syntax-ns#type and caches them. Should be committed every time a modification is made to the N3 store.
#### startProcessing
Changes the <code>processing</code> variable in the store to <code>true</code>, displays a processing message if given.
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | Message which is displayed in the store as processing message |
#### stopProcessing
Changes the code>processing</code> back to <code>false</code> and deletes any processing Message.
### Others
#### RemovePrefix
Checks and removes prefixes from triples which are automatically added by n3.js when parsing blank namespaces.
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | String with potential prefix |
