## Introduction

The article will show how to use `ngFor`, `ngModel` and `enum` to create a dropdown list (select/options).


## Environment

* angular 2: 2.1.0


## select/options


#### HTML

```
<select class="form-control"
        [(ngModel)]="selectedProdType"
        (ngModelChange)="changeSelectedType($event)">
   <option *ngFor="let type of prodTypes" [ngValue]="type">{{type.name}}</option>
</select>
```

> Notice that `ngValue` will affect the value bind to `ngModel` and the parameter: `$event` of `ngModelChange`.
> `[ngValue]= "type"` , selectedProdType will be the selected object.
> `[ngValue]= "type.id"` , selectedProdType will be the id of the selected object.


#### Typescript

```
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'product-create',
})

export class ProdCreateComponent {
    title: string;
    private selectedProdType: ProductType;


    constructor() {
        this.prodTypes = PRODUCT_TYPES;
    }

    //Change Selected Product type callback
    private changeSelectedType(event: any) {
       console.log(event); //object, depends on ngValue
       console.log(this.selectedProdType); //object, depends on ngValue
    }
}

const PRODUCT_TYPES: any[] =
    [{ "id": "1", "name": "Book" }, { "id": "2", "name": "Toy" }, { "id": "3", "name": "Music" }];

```


#### Result

![](https://1.bp.blogspot.com/-tVA8ZSFUp8I/WCsvJYKxlWI/AAAAAAAAD-c/8nS67uI6VQAIFx44krDF4kYx5VYEpdBiwCLcB/s1600/image001.png)


## Use enum as the data source


If the options of the dropdown list are constant, we can store them in an `enum`.

#### enum

```
export enum ProductTypeEnum {
    Book = 1,
    Toy,
    Music
}
```

#### Convert enum to array

First we create a static function for reading all the elements in `ProductTypeEnum` and convert them to a **name-value-pair array**.

```
export class EnumEx {
    static getNamesAndValues<T extends number>(e: any) {
        return EnumEx.getNames(e).map(n => ({ name: n, value: e[n] as T }));
    }
}
```

> See reference : [http://stackoverflow.com/a/21294925/7045253](http://stackoverflow.com/a/21294925/7045253)


Then we can refactor the original `ProdCreateComponent` like this.

```
constructor() {
    this.prodTypes = this.getProductTypes();
}

//Get Product types list
public getProductTypes() {
    let prodTypes: ProductType[] = [];

    //Get name-value pairs from ProductTypeEnum
    let prodTypeEnumList = EnumEx.getNamesAndValues(ProductTypeEnum);

    //Convert name-value pairs to ProductType[]
    prodTypeEnumList.forEach(pair => {
        let prodType = { 'id': pair.value.toString(), 'name': pair.name };
        prodTypes.push(prodType);
    });

    return prodTypes;
}
```

#### Furthermore

Since we have `enum` for the select options, we can use it for comparing or so.

```
private changeSelectedType(event: any) {
    switch (event.id)
    {
        case ProductTypeEnum.Book.toString():
            //...
            break;
        case ProductTypeEnum.Toy.toString():
            //...
            break;
        case ProductTypeEnum.Music.toString():
            //...
            break;
        default:
            break;
    }
}
```

## Reference

1. [How to programmatically enumerate an enum type in Typescript 0.9.5?](http://stackoverflow.com/questions/21293063/how-to-programmatically-enumerate-an-enum-type-in-typescript-0-9-5/21294925#21294925)
