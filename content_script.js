traverse(document.body);

function traverse(node) {
  var child, next

  switch(node.nodeType) {
  case 1:
  case 9:
  case 11:
    child = node.firstChild;
    while(child) {
      next = child.nextSibling;
      traverse(child);
      child = next;
    }
    break;
  case 3:
    handleText(node);
    break;
  }
}

// Produces a link to a search for an isbn on gen.lib.rus.ec
function generateBookLink(isbn) {
  var url = "http://gen.lib.rus.ec/search.php?req=" + isbn + "&column=identifier\""
  var hyperLink = document.createElement('a');
  var linkText = document.createTextNode(isbn);
  hyperLink.appendChild(linkText);
  hyperLink.href = url;
  return hyperLink;
}

// Function is called on every section of text
function handleText(textNode) {

  var isbnRegex = /(97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9])/g;
  var textContents = textNode.nodeValue;
  var regexResults = isbnRegex.exec(textContents);

  if(regexResults) {
    // Determine the start and index of regex search
    var startIndex = regexResults.index;
    var endIndex = startIndex + regexResults[0].length;

    // Break up textNode contents into subparts
    var part1 = textContents.substring(0, startIndex);
    var part2 = generateBookLink(regexResults[0]);
    var part3 = textContents.substring(endIndex);

    console.log(part1); console.log(part3);
    
    // Create text nodes for subparts
    var part1Node = document.createTextNode(part1);
    var part3Node = document.createTextNode(part3);
    var parentNode = textNode.parentNode;

    // Replace textNode with subparts
    parentNode.replaceChild(part1Node, textNode);
    parentNode.insertBefore(part2, part1Node.nextSibling);
    parentNode.insertBefore(part3Node, part2.nextSibling);
  }

}
