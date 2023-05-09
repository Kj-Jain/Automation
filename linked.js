module.exports={
answer:[
  `  SinglyLinkedListNode temp;
  if(llist == null){
      llist = new SinglyLinkedListNode(data);
      return llist;
  }
  temp = new SinglyLinkedListNode(data);
  temp.next = llist;
  llist = temp;
  return llist;`
 
]}