Example of dynamic mock api data.

```javascript
serverManager.get(`${baseApi}/tandem/get-1234`, (req, res) => {
  const results = chance.n(
    () => ({
      date: chance.date(),
    }),
    20
  );

  const responseData = {
    totalResults: 45,
    results,
  };

  res.jsonp(apiSuccessResponse(responseData));
});
```
