# Conventions in this project

    The convention in this project follows no other pathern already know, because i like to test new way to do things, please keep open minded if you gonnas read or colaborate.

## Private Variables and Local classes

    Both begin with a "_" like "_LocalClass" "_privateVariable", since local classes are kind of private within that file.

## Many similar functions

    Are store inside a class as static functions, to use the name of the class as namespace, to make the code more readable.

## Inheritance are used only when really necessary, no unecessary abstraction.

    One example are the classes "Entity" inside "Chatsouls" BotModule, and "DbSystem", with has a child "CS_DbSystem" inside "Chatsouls" BotModule.

## Commit messages

    Commits need to have the type of commit "REFACTOR, FIX, UPDATE" with the location where the commit refers to, like "REFACTOR CS mod" or "REFACTOR Chatsouls module", toguether with a message body, to allow you be more specific what you had changed, add or removed.