var formulario = new Vue({
    el: '#formulario',
    data: {
      nombre:'',
      apellidos:'',
      calle:'',
      noInterior:'',
      noExterior:'',
      colonia:'',
      codigoPostal: '',
      estado:'',
      municipio:'',
      telefono:'',
      correo:'',
      idUser : 0,
      distribuidor_su: '',
      distribuidor_se: '',
      distribuidores_su:[],
      distribuidores_se:[],
      paquetes: [{code: "paquete1", nombre: "Paquete 1", detalle: 120.69, iva: 19.31, total: 140.00}, {code: "paquete2", nombre: "Paquete 2", detalle: 120.69, iva: 19.31, total: 140.00}, {code: "paquete3", nombre: "Paquete 3", detalle: 120.69, iva: 19.31, total: 140.00}],
      categorias:[{marca: "OPTIMO", nombre:"CACHORRO", color: "#25B0F0"}, {marca: "OPTIMO", nombre:"ADULTO", color: "#F90F01"}, {marca: "OPTIMO", nombre:"TREAT TRAINNING", color: "#F90F01"}, {marca: "OPTIMO", nombre:"TREAT DENTAL STR", color: "#F90F01"}, {marca: "OPTIMO", nombre:"FELINO", color: "#8C3FC5"}, {marca: "NUCAN", nombre:"CACHORRO", color: "#3E1B59"}, {marca: "NUCAN", nombre:"ADULTO", color: "#3E1B59"}, {marca: "NUCAT", nombre:"", color: "#E26B09"}, {marca: "NUFIT", nombre:"CACHORRO", color: "#E26B09"}, {marca: "NUFIT", nombre:"ADULTO", color: "#FDC000"}],
      inputPaquete: [{input: 0}, {input:0}, {input:0}],
      inputProducto: [{input: 0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}, {input:0}],
      carritoPaquetes: [],
      carritoProductos: [],
      colonias:[],
      estados:[],
      municipios:[],
      totalPaquete: 0,
      totalProducto: 0,
      wrapContactCenter: true,
      wrapContactLeft: false,
      productos: [],
      producto: [{code: "opc2",nombre: "OPTIMO CACHORRO", kg: "2", detalle: 62.93, iva: 10.07, total: 73.00},
      {code: "opc4", nombre: "OPTIMO CACHORRO", kg: "4", detalle: 120.69, iva: 19.31, total: 140.00},
      {code: "opc20",nombre: "OPTIMO CACHORRO", kg: "20", detalle: 534.48, iva: 85.52, total: 620.00}]
    },
    methods: {
      addCarritoP(code, nombre, index, price, type){
        if(type == "paquete"){
          this.carritoPaquetes.push({code: code, nombre: nombre, count: this.inputPaquete[index].input, price: price })
          this.inputPaquete[index].input=0;
        }
        if(type == "producto"){
          this.carritoProductos.push({code: code, nombre: nombre, count: this.inputProducto[index].input, price: price })
          this.inputProducto[index].input=0;
        }
        this.total();
      },
      removeCarrito(index, type){
        if(type == "paquete"){
          this.carritoPaquetes.splice(index,1);
        }
        if(type == "producto"){
          this.carritoProductos.splice(index,1);
        }
        this.total();
      },
      incrementInput (index, type) {
        if(type == "producto"){
          this.inputProducto[index].input++;
        }
        if(type == "paquete"){
          this.inputPaquete[index].input++;
        }
        this.total();
      },
      decrementInput (index, type) {
        if(this.inputProducto[index].input > 0 && type == "producto"){
          this.inputProducto[index].input--;
        }
        if(this.inputPaquete[index].input > 0 && type == "paquete"){
          this.inputPaquete[index].input--;
        }
        if(this.carritoProductos.length > 0){
          if(this.carritoProductos[index].count > 0 && type == "productoCarrito"){
            this.carritoProductos[index].count--;
            if(this.carritoProductos[index].count == 0){
              this.removeCarrito(index, 'producto')
            }
          }
        }
       
        if(this.carritoPaquetes.length > 0){
          if(this.carritoPaquetes[index].count > 0 && type == "paqueteCarrito"){
            this.carritoPaquetes[index].count--;
            if(this.carritoPaquetes[index].count == 0){
              this.removeCarrito(index, 'paquete')
            }
          }
        }
        this.total();
      },
      total(){
        var  sum,sum1 = 0;
        if(this.carritoProductos.length > 0){
          this.totalProducto = this.carritoProductos.reduce((sum, item) => sum + item.count * item.price, 0);
        }else{
          this.totalProducto = 0;
        }
        if(this.carritoPaquetes.length > 0){
          this.totalPaquete = this.carritoPaquetes.reduce((sum1, item) => sum1 + item.count * item.price, 0);
        }else{
          this.totalPaquete = 0;
        }
      },
      checkForm(){
        console.log(this.nombre +'_-'+ this.apellidos +'_-'+ this.calle +'_-'+ this.noInterior +'_-'+ this.colonia +'_-'+ this.codigoPostal +'_-'+ this.estado +'_-'+ this.municipio +'_-'+ this.telefono +'_-'+ this.correo)
        if(this.nombre == ''  || this.apellidos == '' || this.calle == '' || this.noInterior == '' || this.colonia == '' || this.codigoPostal == '' || this.estado == '' || this.municipio == '' || this.telefono == '' || this.correo == '' ){
          alert("Llene todos los campos")
          return
        }

        var vm = this
        axios.post('http://nupec.com:3000/api/v1/usuario/create', {
            nombre: this.nombre,
            apellido_paterno: this.apellidos,
            municipio_id: this.municipio,
            estado_id: this.estado,
            calle: this.calle,
            numero_int: this.noInterior,
            numero_ext: this.noExterior,
            colonia: this.colonia,
            cp: this.codigoPostal,
            telefono: this.telefono,
            email: this.correo
          })
          .then(function (response) {
            
            vm.idUser = response.data.data.id;
            console.log(vm.idUser)
          })
          .catch(function (error) {
            console.log(error);
          });
          
      },
      idUserID (id){
        console.log(id+"----1")
        this.idUser = id;
      },
      crearOrden(){
        if(this.idUser == 0){
          alert("Para solicitar pedido crea tu usuario")
          return
        }
        if((this.distribuidor_su == '' && this.carritoPaquetes.length > 0) || (this.distribuidor_se == '' && this.carritoProductos.length > 0) ){
          alert("Seleccione un distribuidor")
          return
        }
        if(this.carritoPaquetes.length == 0 && this.carritoProductos.length == 0){
          alert("Agrega elementos a la orden")
          return
        }
        let data = {};
        data.id_usuario = this.idUser;
        if(this.distribuidor_su != ''){
          data.distribuidor_su = this.distribuidor_su;
        }
        if(this.distribuidor_se != ''){
          data.distribuidor_se = this.distribuidor_su;
        }
        data.paquetes = {
          basic: 0,
            mix: 0,
            master: 0
        }
        if(this.carritoPaquetes.length > 0){
          this.carritoPaquetes.map(function(item) {
            if(item.nombre == "Básico"){
              data.paquetes.basic =+ item.count; 
            }
            if(item.nombre == "Mix"){
              data.paquetes.mix =+ item.count; 
            }
            if(item.nombre == "Máster"){
              data.paquetes.master =+ item.count; 
            }
          });
        }
        data.productos= [];
        if(this.carritoProductos.length > 0){
          this.carritoProductos.map(function(item) {
            data.productos.push({id: item.code, qty: item.count})
          });
        }
        axios.post('http://nupec.com:3000/api/v1/orden/create', data)
          .then(function (response) { 
            console.log(response)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    mounted () {
      axios.get('http://nupec.com:3000/api/v1/producto/list').then((response) => {
        this.productos = response.data
         this.productos = this.productos.map(function(item) {
          let iva = item.precio * 0.16;
          iva = Math.round(iva*Math.pow(10,2))/Math.pow(10,2);
          let total = iva + item.precio;
          total = Math.round(total*Math.pow(10,1))/Math.pow(10,1);
          let totalDescuento = total * (1-item.descuento/100);
          totalDescuento = Math.round(totalDescuento*Math.pow(10,1))/Math.pow(10,1);
          return {
            id: item.id,
            nombre: item.nombre,
            marca: item.marca,
            iva,
            precio: item.precio,
            kilos: item.kilos,
            total,
            totalDescuento
          }
        });
      })
      .catch((e) => {
        console.error(e)
      })
      axios.get('http://nupec.com:3000/api/v1/paquete/list').then((response) => {
        this.paquetes = response.data
        this.paquetes = this.paquetes.map(function(item) {
          
          let preciodescuento = item.precio * (1-item.descuento/100);
          preciodescuento = Math.round(preciodescuento*Math.pow(10,2))/Math.pow(10,2);
        
          return {
            id: item.id,
            name: item.name,
            precio: item.precio,
            precioDescuento: Math.round(preciodescuento),
            descuento: item.descuento,
            products: item.products
          }
        }); 
      })
      .catch((e) => {
        console.error(e)
      })
      

    },
    watch: {
      codigoPostal: function(){

        if(this.codigoPostal.length == 5){
          axios.get('http://nupec.com:3000/api/v1/catalogo/postal/'+this.codigoPostal).then((response) => {
            
            if(response.data.estado.id == null){
              alert("codigo postal no valido")
              return
            }
            this.estado = response.data.estado.id;
            this.estados = [response.data.estado];
            this.municipios = [response.data.municipio];
            if(this.municipios.length == 1){
              this.municipio = response.data.municipio.id;
            }
            let urlSu = 'http://nupec.com:3000/api/v1/distribuidor/order/?zone='+response.data.municipio.name+'&estado='+response.data.estado.name+'&linea=1';
            let urlSe = 'http://nupec.com:3000/api/v1/distribuidor/order/?zone='+response.data.municipio.name+'&estado='+response.data.estado.name+'&linea=2';
                axios.get(urlSu).then((distribuidor) => {
                  this.distribuidores_su = distribuidor.data;
                  console.log(this.distribuidor_su)
                })
                .catch((e) => {
                  console.error(e)
                });
                axios.get(urlSe).then((distribuidorSe) => {
                  this.distribuidores_se = distribuidorSe.data;
                })
                .catch((e) => {
                  console.error(e)
                });
          })
          .catch((e) => {
            console.error(e)
          });
          
          
        }

      }
    },
    filters:{
    redondeo: function(value){
    value = Math.round(value*Math.pow(10,2))/Math.pow(10,2);
    return value = Math.round(value)
    },
    precioiva: function(value){
      value = value * 1.16;
      
      console.log(value+"---")
      return value = Math.round(value*Math.pow(10,2))/Math.pow(10,2);

    }
  },  
  });