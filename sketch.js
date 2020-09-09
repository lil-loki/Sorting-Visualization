let values = [];//an array to store the values generated
let values1 = [];
let w = 20;//width of each rectangle
let states=[];//state array to manage the states of the values array
let slider = document.getElementsByClassName("form-control-range")//gets the value of slider to control speed
flag=0
//************************************************  Setup and Draw functions fot P5.js********************************************************


function setup() {
  createCanvas(1000, 500);//Creates a Canvas of width 1000px and Height 500px
  values = new Array(Math.floor(width / w));//Creating an array 
  for (let i = 0; i < values.length; i++) {
    values[i] = floor(random(height));//filling an Array with integers of random value
    values1[i]=values[i]
    states[i]=0
    }
    values1=values1.sort((a,b)=>a-b);
    flag=0  
}


function draw() {
  background(51);//changing the bg of the canvas
  for (let i = 0; i < values.length; i++) {
    strokeWeight(4);//seting the thickness of the stroke
    stroke(51);//setting the stroke colour
    if(states[i]==1)//Changing the colour of the rectangles according to the states of the arrays
    {
      fill('#ffc93c')      
    }
    else if(states[i]==2)
    {
      fill('#00aaff')
    }
    else if(states[i]==3)
    {
      fill('#00ff00')
    }
    else
    {
      fill(255)
    }
    rect(i * w, height - values[i], w, values[i],5);//Creating the rectangles with the values of the array as the height
  }
}

//************************************************** swap function with delay****************************************************************//
async function swap(arr,i,j)//swaps the two items in the array
{
  await sleep(1030-(slider[0].value))
  let temp = arr[i]
  arr[i]=arr[j]
  arr[j]=temp
}

//*************************************************************BUBBLE SORT******************************************************************//
async function bubbleSort(arr)
{
    for(let i=0;i<arr.length;i++)
    {
        for(let j=0;j<arr.length-i-1;j++)
        {  
          states[j]=1
          states[j+1]=1
          if(arr[j]>arr[j+1])
          {
            await swap(arr,j,j+1)
          }
         states[j]=0
         states[j+1]=0
        }
    }
    for(let i=0;i<arr.length;i++)
    {
      await sleep(30)
      states[i]=3
    }
    for(let i=0;i<arr.length;i++)
    {
      states[i]=0
    }
}

//*************************************************************SELECTION SORT***************************************************************//
async function selectionSort(arr) 
{ 
    let i, j, min_idx;
    let n=arr.length
    for (i = 0; i < n-1; i++) 
    { 
        min_idx = i; 
        for (j = i+1; j < n; j++)
        {
          states[j]=1
          states[min_idx]=1
          await sleep(1030-(slider[0].value))
          if (arr[j] < arr[min_idx]) 
          {
            states[j]=0
            states[min_idx]=0
            min_idx = j;
          }
          states[j]=0
          states[min_idx]=0
        }

        await swap(arr,min_idx,i);
    } 
    for(let i=0;i<arr.length;i++)
    {
      await sleep(30)
      states[i]=3
    }
    for(let i=0;i<arr.length;i++)
    {
      states[i]=0
    }

}

//***************************************************************INSERTION SORT*************************************************************//
async function insertionSort(arr)
{
  let key,i,j;
  for(i=0;i<arr.length;i++)
  {
    key=arr[i];
    j=i-1;
    while((j>=0) && (arr[j]>key))
    {
      states[j]=1
      states[j+1]=1
      await sleep(1030-(slider[0].value))
      arr[j+1]=arr[j];
      states[j]=0
      states[j+1]=0
      j=j-1;
    }
    arr[j+1]=key;
  }
  for(let i=0;i<arr.length;i++)
  {
    await sleep(30)
    states[i]=3
  }
  for(let i=0;i<arr.length;i++)
  {
    states[i]=0
  }

}

//*****************************************************************QUICK SORT***************************************************************//


async function quickSort(arr, start, end) {
  
  if (start >= end)
   {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = 0;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
  
state=JSON.stringify(values1)==JSON.stringify(values)
console.log(JSON.stringify(values1));
if (state && flag==0)
{
  for(let i=0;i<arr.length;i++)
  {
    await sleep(30)
    states[i]=3
  }
  for(let i=0;i<arr.length;i++)
  {
    states[i]=0
  }
  flag=1
}

}

async function partition(arr, start, end)
 {
  for (let i = start; i < end; i++) {
    states[i] = 2;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 1;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = 0;
      pivotIndex++;
      states[pivotIndex] = 1;
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = 0;
    }  
  }

  return pivotIndex;
}

//*************************************************************SLEEP FUNCTION***************************************************************//

function sleep(ms)//creates a delay 
{
  return new Promise(resolve=>setTimeout(resolve,ms))
}
