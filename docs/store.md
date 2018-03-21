# Store

## N3
### Actions
#### AddTriple
Adds a triple object to the store.
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| triple | <code>Object</code> | The triple object added to the store |
#### AddFilteredTriple
Calls the [RemovePrefix](#RemovePrefix) function on the subject and object of the triple to remove the prefixes n3.js automatically adds when parsing blank namespaces before adding it to the store using [AddTriple](#addTriple).
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| triple | <code>Object</code> | The triple which is being worked on |
#### StringToStore
High level action parsing a .ttl file into triples and subsequently saving them to the store.
