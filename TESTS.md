# Testing

# 🚧 🚧 🚧 THIS DOCUMENT IS UNDER CONSTRUCTION 🚧 🚧 🚧

Disclaimner: In this document I will compile all my notes and research about testing. Everytime I try to implement this feature I get obfuscated by the excess of information. – @mixcas

## Links

- [Create react app testing docs](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)
- [Unit testing your React application with Jest and Enzyme](https://medium.com/wehkamp-techblog/unit-testing-your-react-application-with-jest-and-enzyme-81c5545cee45)


## Unit testing

> Jest is intended to be used for unit tests of your logic and your components rather than the DOM quirks
> 
> Unit testing is, roughly speaking, testing bits of your code in isolation with test code. The immediate advantages that come to mind are:
> 
> - Running the tests becomes automate-able and repeatable
> - You can test at a much more granular level than point-and-click testing via a GUI
> 
> Note that if your test code writes to a file, opens a database connection or does something over the network, it's more appropriately categorized as an integration test. Integration tests are a good thing, but should not be confused with unit tests. Unit test code should be short, sweet and quick to execute.
Another way to look at unit testing is that you write the tests first. This is known as Test-Driven Development (TDD for short). TDD brings additional advantages:
>
> - You don't write speculative "I might need this in the future" code -- just enough to make the tests pass
> - The code you've written is always covered by tests
> - By writing the test first, you're forced into thinking about how you want to call the code, which usually improves the design of the code in the long run.

[https://stackoverflow.com/questions/1383/what-is-unit-testing
](What is unit testing?)

### Jest

Jest is used bascally to manage the testing and make the assertions. For example, checking for:

- Comparing values
- If Promise is resolved or rejected
- If a function was called (via spies) and how many times
- If an element has a certain property or contains a certain elemnt.

[https://facebook.github.io/jest/docs/en/expect.html](https://facebook.github.io/jest/docs/en/expect.html)

### Enzyme

Enzyme is used to perfomr diferent actions like:

- Find elements
- Simulate clicks
- Call methods
 
[http://airbnb.io/enzyme/docs/api/](http://airbnb.io/enzyme/docs/api/)