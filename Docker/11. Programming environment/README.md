# Programming environment 


## Python

### Create Dockerfile from Python:3-onbuild


```
$ mkdir py-official
$ cd py-officail
$ touch Dockerfile sample.py requirments.txt
```

- Dockerfile

```
FROM python:3-onbuild
RUN pip install -r requirements.txt
CMD ["python", "./sample.py"]
```

> The `onbuild` image steps automatically `COPY` in your directory and install dependencies so the python code is available in the  container.

The above Dockerfile is equal to

```
FROM python:3.7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/
RUN pip install -r requirements.txt

COPY . /usr/src/app
CMD ["python", "./sample.py"]
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
We can install the packages by `RUN pip install -r requirements.txt`


> For example,
>
> ```
> Django==1.11.5
> pytz==2017.2
> ```


#### Build and start a container

```
$ docker build -t py3-demo .
$ docker run -it --rm py3-demo
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987
```


### Execute a single .py

```
$ docker run -it --rm -v "$(pwd)":<directory path> -w <directory path> python:3.7 python <XXXX.py>
```

For example,
```
$ docker run -it --rm -v "$(pwd)":/usr/src/app -w /usr/src/app python:3.7 python sample.py
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
