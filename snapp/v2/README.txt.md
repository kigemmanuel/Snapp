Snapp v2 introude snapp dynamic state

Snapp Dynamic State

Snapp dynamic let you chnage element textNode, attribute, style dynamically without rerending your component!

How it work


const message = snapp.dynamic("Hello World") 

<div>{() => message.value}</div>
instead of {....} you use {() =>...} this make it understand it is a dynamic state
Snapp dynamic state for text
<div>{() => message.value}</div>

update the state using message.update(newValue)

When you update a state Snapp only update just the textNode/attribute/style propperty of what change from, not the entire element, making it very fast

const item = snapp.dynamic("hello")

<div id={() => item.value}>
  {() => username}
</div>

<p 
style={{
  color: () => color.value
}}
></p>

Simple count with snapp dynamic

const counter = snpp.dynamic(0);
<div>Count: {() => counter.value}</div>
<button
  onclick={() => counter.update(counter.value + 1)}
>Increase</button>

Simple no rerender just dynamic change



Note for your other varible you can still use {varible} but what dynamin state varible use {() => varible}


When you delete an element snapp auto clean up the refrence data!

