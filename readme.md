(USER)

to POST a the user (handleRegister)------>   http://localhost:2321/register
{name,email,password,mobile_number,authType} 

user login (handleLogin)-------> http://localhost:2321/login
{email,password} 

GET the user data (handleGetData)---------> http://localhost:2321/getdata

to UPDATE the user data (handleUpdate)--------> http://localhost:2321/update
{id,name}

to DELETE the user data (handleDelete)----------> http://localhost:2321/deleteUser


--------------------------------------------------------------------------------------------


(CATEGORY)

to POST the category (categoryCreate)-------->  http://localhost:2321/catCreate
{Category}
 {authType}

 to GET the category details (categoryRead)---------->  http://localhost:2321/catRead

 ---------------------------------------------------------------------------------------------

 (SUBCATEGORY)
 
 to POST the subCategory (subCategoryCreate) ------------->  http://localhost:2321/subCreate
 { Subcategory_name ,Category}
 {authType}

 to GET the subCategory details (subCategoryRead) -----------> http://localhost:2321/subRead


 ---------------------------------------------------------------------------------------------

 (FOOD)
 
 to POST the food (foodCreate) --------> http://localhost:2321/create
 { Subcategory_name, foodName, foodIngredients, price }
  {authType}

  to GET the food details (foodRead) ----------> http://localhost:2321/read

  ----------------------------------------------------------------------------------------------

  (ORDER)
  
  to POST the order (addOrder) -------------> http://localhost:2321/addOrder
  { id, foodName, quantity, amount, totalAmount }

  to GET the order details (orderRead) -----------> http://localhost:2321/getOrder

  ----------------------------------------------------------------------------------------------

  (PAYMENT)
  
  to POST the payment (addPayment) ---------------> http://localhost:2321/addPayment
  {orderId,payment_type,amount,cart_type,cvc_code}

  to GET the payment details (readPayment) ----------> http://localhost:2321/readPayment

  ----------------------------------------------------------------------------------------------

  (CART)
  
  to POST the cart details (addCart) ------------> http://localhost:2321/addCart
  {userId,foodId,quantity,price}

  to GET the cart details (readCart) ---------------> http://localhost:2321/readCart

  --------------------------------------------------------------------------------------------------------------------------------------

