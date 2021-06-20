# Recording keys for repeated jobs

## Recording

- `q{register}`/`q` start/stop recording to a register.
- `:reg {register}` Show the keys recorded.
- `@{register}` Excute the contents recored in register.
- `@@` Repeat the previous @.



For example, if we want turn

```js
name = 'JB'
from = Tainan
gender = Male
```

to 

```js
var name = 'JB';
var from = Tainan;
var gender = Male;
```

First move to the first line and follow the steps :

| Input keys | Note |
|:-----------|:-----|
| `qa` | Start recording to register `a`. |
| `Ivar<CTRL-o>A;<ESC>` | This will make the first line, `name = 'JB'`, to `var name = 'JB';` |
| `q` | Stop recording. |
| `j` | Go to line 2. |
| `@a` | Repeat the content recorded in register `a` on line 2. |
| `j` | Go to line 3. |
| `@@` | Repeat the previous @ on line 3. |




