# Search and Append

The original document:

```
Q. What progrmming langs are you familiar with?
A. I am familiar with OOP lang. Here are the programming langs I am good at, CSharp, JAVA and JaveScript.
Q. Had you ever use any Functional programming lang?
A. I have a little experience about F#, but I use a lot of FP in JavaScript.
```

The scenario is that we want to replace "lang" with "language".



## Sample 1

Use substitute.

| Input keys | Note |
|:-----------|:-----|
| `:%s/lang/language/g` | |




## Sample 2

Search and append.

| Input keys | Note |
|:-----------|:-----|
| `/lang/e`  | Search "lang" and use `/e` to put the cursor at the end of found text. |
| `auage<ESC>` | Use `a` to go to insert mode and then type `uage` to make "lang" to "language" |
| `n.` | Now we can repeat the replace on the next found text. |




## Sample 3

Like Sample 2, but we can ease a few steps by recording.

| Input keys | Note |
|:-----------|:-----|
| `/lang/e` | |
| `auage<ESC>` | |
| `qa` | Start recording to register "a". |
| `n.q` | Replace the next found text and stop recording. |
| `2@a` | Repeat `@a` 2 times. |


## Sample 4

Use `gn` to repeat the update.

| Input keys | Note |
|:-----------|:-----|
| `/lang` | |
| `cgnlanguage` | `cgn` will delete current found text and we enter `language` to replace it. |
| `.` | Now we can use `.` to repeat the replacement on the next found text. |
