
## Template

### Handle with boolean value

The vars in inventory,

```yaml
MY_FEATURE_TOGGLE:
  MY_FEATURE_1: true
  MY_FEATURE_2: false
```

The j2 file:

```json
"FeatureManagement": {
    "MyFeature1": {{MY_FEATURE_TOGGLE.MY_FEATURE_1|default(true)|bool|lower}},
    "MyFeature2": {{MY_FEATURE_TOGGLE.MY_FEATURE_2|default(true)|bool|lower}}
},
```
