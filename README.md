# BBoard Client
--
A lightweight collaborative editor

### Protocols

|event|name|description|emits|receives|
|---|---|---|---|---|
|CLIENT\_CONNECT|"client\_connect"|client is fully connected|server|client|
|RECEIVE\_TEXT|"receieve\_text"|event with current editor text|server|client|
|CHANGE\_TEXT|"change\_text"|event with changed text|client|server|
|GET\_TEXT|"get\_text"|event to retrieve current editor text|client|server|
|GET\_LANGUAGE|"get\_language"|event to retrieve current editor language|client|server|
|RECEIVE\_LANGUAGE|"receive\_language"|event with current editor language|server|server|
|CHANGE\_LANGUAGE|"change\_language"|event with new language|client|server|


### Supported Languages

|name|value|
|---|---|
|Default|""|
|Python|"python"|
|JavaScript|"javascript"|
