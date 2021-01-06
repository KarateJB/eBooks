# Ansible Vault


## Vault password

### Password source

The vault password can be set thru:

1. Prompt, ie. key in on the fly
2. File path

### Multiple Vault Passwords

A vault ID is the identifier for one or more vault secrets.

By default the vault-id label is only a hint, we can decrypt the encrypted content if the password is correct and no matter the vault-id is matched or not.

Set the [DEFAULT_VAULT_ID_MATCH (`vault_id_match`)](https://docs.ansible.com/ansible/2.8/reference_appendices/config.html#default-vault-id-match) to verify the vault-id before decrypting.

> You will get *fatal: [my-host]: FAILED! => {"changed": false, "msg": "AnsibleVaultError: Decryption failed (no vault secrets were found that could decrypt)"}* when the vault-id does not match.






Use vault ID as following,

#### Prompt

```s
--vault-id <label>@prompt
```

#### File path

Assume that we put the secret to ~/dev-av-secret

```s
$ echo "xxxxx" >> ~/dev-av-secret
```


Then we can use the password file like this, 

```s
--vault-password-file ~/dev-av-secret
```


To set a label,

```s
--vault-id <label>@~/dev-av-secret
```

If we use certain password file frequently, we can set [DEFAULT_VAULT_PASSWORD_FILE (`vault_password_file`)](https://docs.ansible.com/ansible/2.8/reference_appendices/config.html#default-vault-password-file) or [DEFAULT_VAULT_IDENTITY (`vault_identity`)] for either` -vault-password-file` or `--vault-id`.


For example, set the variables in `ansible.cfg`

```
vault_identity = dev
vault_password_file = ~/dev-av-secret
```

is equal to `--vault-id dev@~/dev-av-secret`.





## File level

### Create new file and encrypt

The following command will first ask a vault password and than open the editor to edit the file.

```s
$ ansible-vault create foo.yml 
```


Create encrypted file with vault-id,

```s
$ ansible-vault create --vault-id dev@~/dev-av-secret demo.yml
```

![](assets/create_file_by_file_vault_id.jpg)



Or by prompt,

```s
$ ansile-vault create --vault-id staging@prompt demo2.yml
```

![](assets/create_file_by_prompt_vault_id.jpg)


which is equal to 

```s
$ ansible-vault create --ask-vault-pass demo2.yml
```



### Edit encrypted file

```s
$ ansible-vault edit foo.yml
```

It will ask you for the vault password before editing the file.
Or we can use the password from file,

```s
$ ansible-vault edit --vault-id dev@~/dev-av-secret demo.yml
```



### View encrypted file(s)

```s
$ ansible-vault view demo.yml [demo2.yml ...]
```

Or use the password file,

```s
$ ansible-vault view --vault-id dev@~/dev-av-secret demo.yml [demo3.yml ...]
```




### Change the vault password of file(s)

```s
$ ansible-vault rekey foo.yml [foo2.yml ...]
```

It will ask for both the old and new vault passwords.
Or we can use the password files,

```s
$ ansible-vault rekey --vault-id dev@~/dev-av-secret --new-vault-id prod@~/prod-av-secret demo.yml
Rekey successful
```


### Encrypt existing file(s)

```s
$ ansible-vault encrypt demo.yml [demo2.yml ...]
```

Or encrypt the file by password file,

```s
$ ansible-vault encrypt --vault-id dev/dev-av-secret demo.yml demo2.yml
```



### Decrypt encrypted file(s)

```s
$ ansible-vault decrypt demo.yml [demo2.yml ...]
```

Or decrypt by password file,

```s
$ ansible-vault decrypt --vault-id dev@~/dev-av-secret demo.yml
```





## Variable level

### Encrypt string as a variable

```s
$ ansible-vault encrypt_string --vault-id dev@~/dev-av-secret 'my some secret string' --name 'my_secret'
```

Or

```s
$ ansible-vault encrypt_string --vault-password-file dev@~/dev-av-secret 'my some secret string' --name 'my_secret'
```

![](assets/encrypt_string.jpg)


Also we can encrypt something from stdin, e.q.

```s
$ ansible-vault encrypt_string --vault-id dev@a_password_file --stdin-name 'my_secret'
```

![](assets/encrypt_string_stdin.jpg)




## Decrypt the variable in ansible-playbook

The usage is as same as `ansible-vault`, we can use `--vault-id`, `vault-password-file`, `--ask-vault-pass`.

For example,

```s
$ ansible-playbook --vault-id dev@~/dev-av-secret -i ./inventories/demo/ demo.yml
```




## Ansible Configuration Settings

- [DEFAULT_VAULT_ENCRYPT_IDENTITY](https://docs.ansible.com/ansible/2.8/reference_appendices/config.html#default-vault-encrypt-identity)
- [DEFAULT_VAULT_ID_MATCH](https://docs.ansible.com/ansible/2.8/reference_appendices/config.html#default-vault-id-match)
- [DEFAULT_VAULT_IDENTITY](https://docs.ansible.com/ansible/2.8/reference_appendices/config.html#default-vault-identity)
- [DEFAULT_VAULT_IDENTITY_LIST](https://docs.ansible.com/ansible/2.8/reference_appendices/config.html#default-vault-identity-list)
- [DEFAULT_VAULT_PASSWORD_FILE](https://docs.ansible.com/ansible/2.8/reference_appendices/config.html#default-vault-password-file)



## Reference

- [Ansible Vault](https://docs.ansible.com/ansible/2.8/user_guide/vault.html)