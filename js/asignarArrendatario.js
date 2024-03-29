const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow
const mysql = require("mysql")

var arrendatario4 = new Vue({
    el: "#arrendatario4",
    data: {
        window: remote.getCurrentWindow(),
        arrendatario: [],
        arrendatarioNuevo:[],
        con: mysql.createConnection({
            user: "root",
            password: "",
            host: "localhost",
            database: "sic"
        }),
    },
    methods: {
        cargarSelect: function () {
            var edificio = document.getElementById("edificio")
            this.con.connect(function () {
                arrendatario4.con.query("select * from edificio", function (error, result) {
                    result.forEach(function (dato) {
                        var option = document.createElement("option")
                        option.value = dato.id
                        option.innerHTML = dato.nombre
                        edificio.appendChild(option)
                    })
                })
            })
        },
        cargarSelect2: function () {
            var departamento = document.getElementById("departamento")
            this.con.connect(function () {
                arrendatario4.con.query("select * from departamento ", function (error, result) {
                    result.forEach(function (dato) {
                        var option = document.createElement("option")
                        option.value = dato.id
                        option.innerHTML = dato.numero
                        departamento.appendChild(option)
                    })
                })
            })
        },
        buscar: function (e) {
            e.preventDefault()
            form = e.target.parentNode.parentNode.parentNode
            edificio=form.edificio.value
            departamento=form.departamento.value
            this.con.connect(function () {
                arrendatario4.con.query("select departamento.arrendatario,arrendatario.* from departamento join arrendatario on departamento.arrendatario=arrendatario.rut where departamento.id=?", [departamento], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Arrendatario no encontrado',
                        })
                    } else {
                        result.forEach(function (element) {
                            arrendatario4.arrendatario = result
                        })

                    }
                })
            })
        },
        buscar2: function (e) {
            e.preventDefault()
            rut=document.getElementById("rut").value
            console.log(rut)
            this.con.connect(function () {
                arrendatario4.con.query("select * from arrendatario where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Arrendatario no encontrado',
                        })
                    } else {
                        result.forEach(function (element) {
                            arrendatario4.arrendatarioNuevo = result
                        })

                    }   
                })
            })
        },
        asignarArrendatario: function (e) {
            e.preventDefault()
            rut=document.getElementById("rut").value
            edificio=form.edificio.value
            departamento=form.departamento.value
            console.log(rut)
            this.con.connect(function () {
                arrendatario4.con.query("select * from arrendatario where rut=?", [rut], function (error, result) {
                    if (result.length == 0) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error...',
                            text: 'Arrendatario no encontrado',
                        })
                    } else {
                        arrendatario4.con.query("update departamento set arrendatario=? where id=?", [rut,departamento], function (error, result) {
                            form.rut.value = ""
                            Swal.fire({
                                type: 'success',
                                title: 'Listo!',
                                text: 'Arrendatario asignado!',
                            })
                            arrendatario4.arrendatarioNuevo=[]
                            arrendatario4.arrendatario=[]
                        })
                    }
                })
            })
        }
    },
    mounted: function () {
        this.cargarSelect()
        this.cargarSelect2()
    }

});