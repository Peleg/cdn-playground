var defaultQuery = {
  'x-algolia-api-key': '2663c73014d2e4d6d1778cc8ad9fd010',
  'x-algolia-application-id': '2QWLVLXZB6',
  'x-algolia-agent': 'Algolia for vanilla JavaScript 3.10.2'
};

var baseUrl = 'https://2qwlvlxzb6-dsn.algolia.net/1/indexes/libraries/query/?' +
  Object.keys(defaultQuery).map(function (key) {
    return key + '=' + encodeURIComponent(defaultQuery[key]);
  }).join('&');

function add(cdnUrl) {
  var script = document.createElement('script');
  script.src = cdnUrl;
  document.head.appendChild(script);
}

function createSearchResultRow(hit) {
  var cdn = ['https://cdnjs.cloudflare.com/ajax/libs', hit.name, hit.version, hit.filename].join('/');
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  td.innerText = hit.filename;
  tr.appendChild(td);

  td = document.createElement('td');
  td.innerText = hit.version;
  tr.appendChild(td);

  td = document.createElement('td');
  td.innerHTML = '<button onclick=add("' + cdn + '")>Add!</button>';
  tr.appendChild(td);

  return tr;
}

function insertSearchResults(json) {
  searchResults.innerHTML = '';
  searchResults.appendChild(json.hits.reduce(function (frag, hit) {
    frag.appendChild(createSearchResultRow(hit));
    return frag;
  }, document.createDocumentFragment()));
}

function search(query) {
  fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify({ params: 'query=' + query })
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    insertSearchResults(json);
  });
}
