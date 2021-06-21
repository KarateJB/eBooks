# Recording keys for repeated jobs

## Recording

- `q{register}`/`q` start/stop recording to a register.
- `:reg {register}` Show the keys recorded.
- `@{register}` Excute the contents recored in register.
- `@@` Repeat the previous @.



For example, if we want turn

```js
name = 'JB'
from = 'Tainan'
gender = 'Male'
tel = '09123XXXX'
```

into 

```js
var name = 'JB';
var from = 'Tainan';
var gender = 'Male';
var tel = '09123XXX';
```

First move to the first line and follow the steps.


### Method 1. Execute the @ in each line

| Input keys | Note |
|:-----------|:-----|
| `qa` | Start recording to register `a`. |
| `Ivar<CTRL-o>A;<ESC>` | This will make the first line, `name = 'JB'`, to `var name = 'JB';` |
| `q` | Stop recording. |
| `j` | Go to line 2. |
| `@a` | Repeat the content recorded in register `a` on line 2. |
| `j` | Go to line 3. |
| `@@` | Repeat the previous @ on line 3. |
| `j@@` | Repeat the previous @ on line 4. |


### Method 2. Execute the @ several times

We can reuse the recording by `{times}@{register}`:

| Input keys | Note |
|:-----------|:-----|
| `qa` | Start recording to register `a`. |
| `Ivar<CTRL-o>A;<ESC>j` | This will make the first line, `name = 'JB'`, to `var name = 'JB';`, and then move to next line. |
| `q` | Stop recording. |
| `3@a` | Execute `@` 3 times on line 2 to 4. |


### Method 3. Execute the @ in command mode

| Input keys | Note |
|:-----------|:-----|
| `qa` | Start recording to register `a`. |
| `Ivar<CTRL-o>A;<ESC>` | This will make the first line, `name = 'JB'`, to `var name = 'JB';` |
| `jv2j` | Select the other 3 lines. |
| `:'<,'>normal @a` | Execute the `@` on selected lines. |



## Advanced Repeat

### Use . in @

For example, we want to turn

```js
var animals = ['Dog','Cat','Tiger','Bear'];
```

into

```js
var animals = ["Dog","Cat","Tiger","Bear"];
```

| Input keys | Note |
|:-----------|:-----|
| `0f'r"` | Replace the first `'` to `"`. |
| `qa` | Start recording to register `a`. |
| `f'.` | Replace the second `'` to `"` by repeat last change (`.`). |
| `q` | Stop recording. |
| `22@a` | Execute `@` for 22 times, although there are not so many `'` to be replaced, it's ok. |



### 

When the keys executed in a `@`(record) fails, the 

