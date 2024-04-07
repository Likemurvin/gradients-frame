import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { pinata } from 'frog/hubs'

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: pinata()
})

app.use('/*', serveStatic({ root: './public' }))

function rndcol(){
  return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
}

var randi = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
var randi2 = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
var angle = 0
var grid = [100,100]
var grid_compositions = [[10,100],[100,10],[50,50],[100,100],[5,100],[100,5],[100,20],[20,100]]
var amount_of_colors = 2
var colors_arr = [rndcol(), rndcol()]


app.frame('/', (c) => {
  const { buttonValue, inputText, status, verified } = c

  // const sq_w = Math.floor(Math.random()*100)
  // const sq_h = Math.floor(Math.random()*100)
  var get_amount = inputText


  if(buttonValue === 'change'){
      amount_of_colors = Math.floor((Math.random())*10) + 2
      randi = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
      randi2 = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

      colors_arr = []
      for(let c=0; c<amount_of_colors; c++){
        colors_arr.push(rndcol())
      }

  }

  // if(get_amount){
  //   amount_of_colors = Number(get_amount)
  //   colors_arr = []
  //   for(let c=0; c<amount_of_colors; c++){
  //     colors_arr.push(rndcol())
  //   }
  // }

  if(buttonValue === 'change_angle'){
    angle = Math.floor(Math.random()*180)
  }
 
  if(buttonValue === 'grid'){
    let gc = grid_compositions[Math.floor((Math.random())*grid_compositions.length)]
    grid[0] = gc[0]
    grid[1] = gc[1]
  }


  if(buttonValue === 'randomize'){
    let gc = grid_compositions[Math.floor((Math.random())*grid_compositions.length)]
    grid[0] = gc[0]
    grid[1] = gc[1]
    angle = Math.floor(Math.random()*180)
    randi = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    randi2 = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    colors_arr = []
    for(let c=0; c<amount_of_colors; c++){
      colors_arr.push(rndcol())
    }


  }

  // var gr_col = `${angle}deg, ${randi}, ${randi2}, ${randi}, ${randi2}, ${randi}`
  var gr_col = `linear-gradient(${angle}deg`

  for(let i=0; i<amount_of_colors*2; i++){
    let color = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    let color_sets = [randi, randi2]
    // let p_c = color_sets[i%2]
    let p_c = colors_arr[i%amount_of_colors]
    // if(buttonValue === 'randomize'){
    //   p_c = color
    // }
    gr_col += `,${p_c}`
  }

  var out_grid = [100/grid[0], 100/grid[1]]

  var rect =         <div 
  style = {{
    display: 'flex',
    width:`40%`,
    height: `30%`,
    background: `#000000`,
    opacity: '0.1',
    borderRadius: '30px'
  }} >
      <div style={{ color: 'white', display: 'flex', fontSize: 60, opacity: 1 }}>
        {inputText}
      </div>
  </div>
  
  // var rect2 =         <div 
  // style = {{
  //   display: 'flex',
  //   width:`100%`,
  //   height:  `${sq_h}%`,
  //   background: `${randi2}`,
  // }} ></div>
  // if(verified){
    return c.res({
      image: (
        <div
          style={{
            alignItems: 'center',
            background:
              status === 'response'
                ? `${gr_col})`
                : `linear-gradient(0deg,${colors_arr[0]},${colors_arr[1]})`,
            backgroundSize: 
            status === 'response'
            ? `${grid[0]}% ${grid[1]}%`
            : `100% 100%`,
            // backgroundSize: '100%, 100%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            height: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
            borderRadius:'30px',
          }}
        > 
        {status === 'response'
        ? ""
        :
        <div style={{alignItems: 'flex-end', color: 'white', display: 'flex', fontSize: 60, textShadow: '2px 2px 4px black' }}>
          GRADIENTS.FRAME
          <div style={{alignItems: 'flex-end', color: 'white', display: 'flex', fontSize: 30, opacity: 0.5, textShadow: '2px 2px 4px black' , paddingTop:150, paddingBottom: 20}}>
          by @likemurvin
          </div>
        </div>
        }
        {status === 'response'
        ? ""
        :
        <div style={{textAlign: 'justify', color: 'white', display: 'flex', fontSize: 20, textShadow: '2px 2px 4px black', padding: 10 }}>
            🎲 - RANDOMIZE ALL PARAMETERS   
        </div>
        }
        {status === 'response'
        ? ""
        :
        <div style={{textAlign: 'justify', color: 'white', display: 'flex', fontSize: 20, textShadow: '2px 2px 4px black' , padding: 10}}>
            🎹 - GRID COMPOSITIONS   
        </div>
        }
              {status === 'response'
        ? ""
        :
        <div style={{textAlign: 'justify', color: 'white', display: 'flex', fontSize: 20, textShadow: '2px 2px 4px black', padding: 10 }}> 
            📐 - CHANGE GRADIENT ANGLE  
        </div>
        }
              {status === 'response'
        ? ""
        :
        <div style={{textAlign: 'justify', color: 'white', display: 'flex', fontSize: 20, textShadow: '2px 2px 4px black', padding: 10 }}>
            🎨 - RANDOMIZE COLORS  
        </div>
        }

          {/* {rect} */}
        

        </div>
      ),
      intents: [
        // <TextInput placeholder="Enter amount of colors fruit..." />,
        <Button value="randomize"> 🎲 </Button>,
        <Button value="grid">🎹 {out_grid[0].toString()} | {out_grid[1].toString()}</Button>,
        <Button value="change_angle"> 📐 {angle.toString()}°</Button>,
        <Button value="change"> 🎨 {amount_of_colors.toString()} </Button>,
        // <Button value="+"> ➕ </Button>,
        // <Button value="-"> ➖ </Button>,
        // status === 'response' && 
        // <Button.Reset>Reset</Button.Reset>,
      ],
    })
  // }
  // return c.res({
  //   image:        
  //    <div style={{alignItems: 'flex-end', color: 'white', display: 'flex', fontSize: 60, textShadow: '2px 2px 4px black' }}>
  //     INVALID USER 🫠
  // </div>
  // })
})

const port = 3000
console.log(`Server is running on port ${port}`)

devtools(app, { serveStatic })

serve({
  fetch: app.fetch,
  port,
})
