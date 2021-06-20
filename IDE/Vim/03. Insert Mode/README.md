# Insert Mode

## Back to Normal Mode

- `<CTRL-[>`   or `<ESC>`. 
- `<CTRL-o>`: Switch to Insert-Normal mode. When you back to Normal mode by this way, it will be back to Insert Mode after you execute an action on Normal Mode. This will reduce the times of switching modes. 

   E.q. When inserting something and you want to centerize the current line, use `<CTRL-o>zz`. 



- `<CTRL-h>` Delete previous character, equals to backspace.
- `<CTRL-w>` Delete from the cursor to the beginning of the previous word.
- `<CTRL-u>` Delete everything to the left of the cursor on that line.

## Insert

- `<CTRL-r>=` Insert the computed result, e.q. `<CTRL-r>=11*2<Enter>` will insert 22.

- `<CTRL-v>{code}` Insert a character by Unicode decimal(十進位)  or hexadecimal(十六進位).
   - Decimal code: `<CTRL-v>065` will output `A`.
   - Hex code: `<CTRL-v>u0042` will output `B`.
   - To see the Decimal & Hex code of a char, use `ga` on the char in Normal Mode. 
     E.q. an `A` will show `<A> 65, Hex 41, Octal 101`. 
   - See [List of Unicode characters](https://en.wikipedia.org/wiki/List_of_Unicode_characters).


- `<CTRL-k>{char1}{char2}` to enter a digraph, which is a method of entering a more extensive range of Unicode characters using pairs of keystrokes. 1
  e.q. `<CTRL-k>cr` will output `^M`.

  - Use command: `:h digraph-table` or `:digraphs` to see the list of digraph.



## Paste Register

- `<CTRL-r>{register}`  Paste a register.
- `<CTRL-r><CTRL-p>{register}` Paster a register without shift-block format.

