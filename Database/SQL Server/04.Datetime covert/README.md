## Convert datetime to varchar

```sql
SELECT CONVERT(varchar(12) , getdate(), 111 )
--2020/09/12

SELECT CONVERT(varchar(8),getdate(), 112 )
--20200912

SELECT CONVERT(varchar(12) , getdate(), 102 )
--2020.09.12

SELECT CONVERT(varchar(12) , getdate(), 101 )
--09/12/2020

SELECT CONVERT(varchar(12) , getdate(), 103 )
--12/09/2020

SELECT CONVERT(varchar(12) , getdate(), 104 )
--12.09.2020

SELECT CONVERT(varchar(12) , getdate(), 105 )
--12-09-2020

SELECT CONVERT(varchar(12) , getdate(), 106 )
--12 09 2020

SELECT CONVERT(varchar(12) , getdate(), 107 )
--09 12, 2020

SELECT CONVERT(varchar(12) , getdate(), 108 )
--11:06:08

SELECT CONVERT(varchar(12) , getdate(), 109 )
--09 12 2020 1

SELECT CONVERT(varchar(12) , getdate(), 110 )
--09-12-2020

SELECT CONVERT(varchar(12) , getdate(), 113 )
--12 09 2020 1

SELECT CONVERT(varchar(12) , getdate(), 114 )
--11:06:08.177
```


## Convert varchar to datetime

Just follow the convertion code and format to convert from varchar to datetime.

E.q.

```sql
SELECT CONVERT(DATETIME,'2020/01/20',111)

SELECT CONVERT(DATETIME,'20200120',112)
```

We can check if the string is a datetime by,

```sql
SELECT ISDATE('2004-03-01') -- 1: true, 0: false
```


## Show year/month/day

Assume that its `2020-12-11` now.

```sql
/* Quarter */
SELECT DATEPART(qq, getdate())
--4

/* Year */
SELECT year(getdate())
--2020
SELECT DATEPART(yyyy, getdate())
--2020
SELECT DATEPART(yy, getdate())
--2020

/* Month */
SELECT month(getdate())
--12
SELECT DATEPART(mm, getdate())
--12
SELECT DATEPART(m, getdate())
--12

/* Day */
SELECT day(getdate())
--11
SELECT DATEPART(dd, getdate())
--11
SELECT DATEPART(d, getdate())
--11
SELECT DATEPART(dw, getdate())
--6
--Notice that the day shows as : return 1(Sunday),2(Monday),3(Tuesday),4(Wednesday),5(Thursday),6(Friday),7(Saturday) … etc
```

