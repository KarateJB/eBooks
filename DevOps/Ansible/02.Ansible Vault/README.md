# Ansible Vault

## File level

### Create new file and encrypt

The following command will first ask a vault password and than open the editor to edit the file.

```s
$ ansible-vault create foo.yml 
```

### Edit encrypted file

```s
$ ansible-vault edit foo.yml
```

It will ask you for the vault password before editing the file.


### Change the vault password

```s
$ ansible-vault rekey foo.yml [foo2.yml ...]
```

It will ask for both the old and new vault passwords.


