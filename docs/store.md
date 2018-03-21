# Store

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
