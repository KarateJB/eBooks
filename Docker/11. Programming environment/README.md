# Programming environment 


## Python

### Create Dockerfile from Python3

```
$ mkdir py-official
$ cd py-officail
$ touch Dockerfile sample.py requirments.txt
```

- Dockerfile

```
FROM python:3-onbuild
RUN pip install
CMD ["python3.5", "./py3-sample.py"]
```

- sample.py

This is a sample code for calculating Fibonacci numbers.

```
def fib(n):
    a, b=0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()

fib(1000)
```

- requirments.txt (Optional)

Keep the packages' information in this file, such as [NumPy](http://www.numpy.org/), [Django](https://www.djangoproject.com/), [pytz](http://pytz.sourceforge.net/).
We can install the packages by `RUN pip install`


> For example,
>
> ```
> Django==1.11.5
> pytz==2017.2
> ```


#### Build and start a container

```
$ docker build -t py3-demo .
$ docker run -it --rm --name my-py3 py3-demo
```


### Execute a single .py

```
$ docker run -it --rm -v "$(pwd)":<directory path> -w <directory path> python:3 python <XXXX.py>
```

For example,
```
$ docker run -it --rm --name my-py3 py3-demo -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp python:3 python sample.py
```


### Create Dockerfile from PyPy

```
$ mkdir pypy
$ cd pypy
$ touch Dockerfile sample.py
```

- Dockerfile

```
FORM pypy:3-onbuild
CMD ["pypy3","./sample.py"]
```

- sample.py

We use the same content on previous Python3 example.


#### Build and start a container

```
$ docker build -t pypy-demo .
$ docker run -it --rm --name my-py3 py3-demo
```

### Execute a single .py by PyPy

```
$ docker run -it --rm -v "$(pwd)":<directory path> -w <directory path> pypy:3 pypy <XXXX.py>
```

For example,
```
$ docker run -it --rm --name my-py3 py3-demo -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp pypy:3 pypy <XXXX.py>
```
