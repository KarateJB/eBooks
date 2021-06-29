# Search and Uppercase

The original document:

```
Peter: You should write XML comment on each function.
Mary: How to do that? I am not familiar with XML comment.
Peter: You can use XmlDocument extension on your IDE.
```

No we want to make every "xml" to uppercase, "XML" except for "XmlDocument".


## Sample 1.

| Input keys | Note |
|:-----------|:-----|
| `/xml\C` | |
| `gUaw` | Make "xml" to "XML". |
| `n.` | Repeat the action on next found text. |


## Sample 2.

| Input keys | Note |
|:-----------|:-----|
| `/xml\C` | |
| `gUgn` | `gn` will select the matched text and `gU` will make the selected text to uppercase. |
| `.` | Repeat the action on next found text. |





