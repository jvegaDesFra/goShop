var myApp = new Framework7({

    //swipePanel: 'left',
    material: true,
    template7Pages: true,
    tapHold: true

    // ... other parameters
});

// Export selectors engine
var $$ = Dom7;
var UrlBase = "http://enformobile.com.mx/Data/";
//var UrlBase = "http://192.168.1.102/Data/"; //localhost 192.168.0.103:
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    //dynamicNavbar: true,

});

if (localStorage.CurrentLogin != undefined) {
    mainView.router.loadPage("list.html");
}
else {
    mainView.router.loadPage("login.html");
}

//else {
//    mainView.router.loadPage("index.html");
//}
$$(document).on('pageShow', function (e) {
    var page = e.detail.page;

    // Code for About page
    if (page.name === 'registro') {
        
        $$('.close-notification').click();
    }
    if (page.name === 'login') {

        $$('.close-notification').click();
    }
    if (page.name === 'addItem') {
       
    }

});
function CargaProductos(result, e) {

    var page = e.detail.page;
    //localStorage.Productos = JSON.stringify(result);<div class="content-block-title">Productos</div>
    var CurrentList = JSON.parse(result);
    var arreglo_Resultado;
    var listHTML = '';
    listHTML += '<div class="list-block media-list list-block-search searchbar-found">';
    listHTML += '<br/><br/><ul>';
    for (var i = 0; i < CurrentList.length; i++) {
        arreglo_temporada = CurrentList[i].NAME.split(',');

        listHTML += '<li>';
        listHTML += ' <a href="#" id="btnProduc" class="item-link item-content" data-nombre="' + arreglo_temporada[1] + '" data-precio="' + CurrentList[i].precio + '" value="' + CurrentList[i].id_productos + '">';
        //listHTML += '                <div class="item-media"><img src="..." width="80"></div>';
        listHTML += '                <div class="item-inner">';
        listHTML += '                    <div class="item-title-row">';
        listHTML += '                        <div class="item-title">' + arreglo_temporada[1] + '</div>';
       // listHTML += '                        <div class="item-after">$' + CurrentList[i].precio + '</div>';
        listHTML += '                    </div>';
        listHTML += '                    <div class="item-subtitle">' + arreglo_temporada[2] + '</div>';
        listHTML += '                    <div class="item-text">Presentación: ' + CurrentList[i].DescripcionLarga + '</div>';

        listHTML += '               </div>';
        listHTML += '            </a>';
        listHTML += '</li>';
    }
    listHTML += '</ul>';
    listHTML += ' </div>';

    var PullRefresh = "<div class='pull-to-refresh-layer'>";
    PullRefresh += "    <div class='preloader'> </div>";
    PullRefresh += "    <div class='pull-to-refresh-arrow'></div>";
    PullRefresh += "  </div> ";
    PullRefresh += "<div class='content-block searchbar-not-found'>";
    PullRefresh += "    <div class='content-block-inner'>No se encontraron resultados.</div>";
    PullRefresh += "</div>";

    $$(page.container).find('.page-content').html("<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />");
    $$(page.container).find('.page-content').html(PullRefresh);
    $$(page.container).find('.page-content').append(listHTML);

    var searcher = myApp.searchbar('.searchbar', {
        searchList: '.list-block-search',
        searchIn: '.item-title, .item-text',
        overlay: true
    });

};
function MuestraFavorito(TipoLista, ClaveListaFav) {
    //var _html;
    //if (TipoLista == 1)
    //    _html = "<a href='#' id='btnFav' status='1' class='link icon-only'><i class='icon ion-android-star'></i></a>";
    //else
    //    _html = "<a href='#' id='btnFav' status='0' class='link icon-only'><i class='icon ion-android-star-outline'></i></a>";

    //$$("#btnFavorito").html(_html);

    MuestraListaDetalle(ClaveListaFav);
}

$$(document).on('click', '#eliminarListaD', function () {
    
    myApp.confirm('¿Desea eliminar el producto ' + localStorage.NombreActualizar +'?', 'Confirmar', function () {
        var dato = localStorage.DatoSeleccionado;
        var url_ = UrlBase + "EliminarListaDetalle.php?detalle=" + dato;
        
        $$.ajax({
            type: 'GET',
            url: url_,
            beforeSend: function () {
                myApp.showPreloader("Espere ...");
            },
            complete: function () {
                myApp.hidePreloader();
            },
            cache: false,
            success: function (data) {
                
                mainView.router.refreshPage();
                
            },
            error: function (data) {
                alert(data);
            }
        });
    });

});
$$(document).on('click', '#editarListaD', function () {
    var dato = localStorage.DatoSeleccionado;
    var url_ = UrlBase + "ObtenerListaDetalle.php?detalle=" + dato;
    var CurrentDetailList;
    $$.ajax({
        type: 'GET',
        url: url_,
        beforeSend: function () {
            myApp.showPreloader("Obteniendo Precio y Cantidad");
        },
        complete: function () {
            myApp.hidePreloader();
        },
        cache: false,
        success: function (data) {
            CurrentDetailList = JSON.parse(data);
            localStorage.PrecioActualizar = CurrentDetailList[0].precio;
            localStorage.CantidadActualizar = CurrentDetailList[0].cantidad;
            localStorage.EsEdicionProducto = "SI";
            mainView.router.loadPage("addItem.html");
            //myApp.prompt2('Agregar producto a la lista con el siguiente precio?', '',
            //     function (value) {

            //         var Response = value.split('-');
            //         ActualizaListaDetalle(Response[0], dato, Response[1]);

            //     },
            //     function (value) {

            //     }, CurrentDetailList[0].precio, CurrentDetailList[0].cantidad
            //   );
        },
        error: function (data) {
            alert(data);
        }
    });

});
$$(document).on('click', '#unos', function () {





});
$$(document).on('taphold', '#unos', function () {
    var Estado = $$(this).attr('data-clave');
    localStorage.NombreActualizar = $$(this).attr('data-nombre');
    localStorage.DatoSeleccionado = Estado;
    // alert(Estado);
    var clickedLink = this;
    var popoverHTML = '<div class="popover">' +
                        '<div class="popover-inner">' +
                          '<div class="list-block">' +
                            '<ul>' +
                            '<li><a href="#" class="item-link list-button close-popover" id="editarListaD">Editar</li>' +
                            '<li><a href="#" class="item-link list-button close-popover" id="eliminarListaD">Eliminar</li>' +

                            '</ul>' +
                          '</div>' +
                        '</div>' +
                      '</div>'
    myApp.popover(popoverHTML, clickedLink);
    //var buttons = [
    //{
    //    text: '¿Que deseas hacer?',
    //    label: true
    //},
    //    {
    //        text: 'Editar',
    //        bold: true,
    //        onClick: function () {
    //            myApp.alert('Editar');
    //        }
    //    },
    //    {
    //        text: 'Eliminar',
    //        onClick: function () {
    //            myApp.alert('Eliminar');
    //        }
    //    },
    //    {
    //        text: 'Cancelar',
    //        color: 'red'
    //    },
    //];
    //myApp.actions(buttons);
});
$$('.create-links').on('click', function () {

});
function ArmaListaDetalle(data) {
    var CurrentDetailList = JSON.parse(data);
    $$("#NomSubLista").html(localStorage.NombreSubLista);

    var ListaDetalleVAR = "";
    var ListaDetalleVARNombre = "";
    ListaDetalleVAR += " <ul>";
    ListaDetalleVARNombre += " <ul>";
    var TotalLista = 0;
    for (var i = 0; i < CurrentDetailList.length; i++) {
        var totalFinal = parseFloat(CurrentDetailList[i].precio) * parseFloat(CurrentDetailList[i].cantidad);
        
        localStorage.ListaActual = CurrentDetailList[i].clave_lista;
        ListaDetalleVAR += "<li>";
        ListaDetalleVAR += "<label id='btn1' class='label-checkbox item-content'> ";
        if (CurrentDetailList[i].estado == 0) {
            ListaDetalleVAR += "<input type='checkbox'  name='my-checkbox' id='" + CurrentDetailList[i].clave_listadetalle + "' value='" + CurrentDetailList[i].estado + "' >";
        }
        else {
            ListaDetalleVAR += "<input type='checkbox'  name='my-checkbox' id='" + CurrentDetailList[i].clave_listadetalle + "' value='" + CurrentDetailList[i].estado + "' checked='checked'>";
            TotalLista += totalFinal;
           

        }
        ListaDetalleVAR += " <div class='item-media' >";
        ListaDetalleVAR += "<i class='icon icon-form-checkbox'></i>";
        ListaDetalleVAR += "</div>";
        ListaDetalleVAR += "<div class='item-inner'>";
        ListaDetalleVAR += "<div class='item-title'>&nbsp;</div>";
        ListaDetalleVAR += "<div class='item-after'>&nbsp;</div>";
        ListaDetalleVAR += "<div class='item-after'>&nbsp;</div>";
        ListaDetalleVAR += "</div>";
        ListaDetalleVAR += "</label>";
        ListaDetalleVAR += "</li>";
    }
    //ListaDetalleVAR += "<li><div class='item-content'><div class='item-inner'><div class='item-title'>title</div><div class='item-after'>";
    //ListaDetalleVAR += "<label class='label-switch'> <input type='checkbox'> <div class='checkbox'></div> </label>";  
    //ListaDetalleVAR += "</div></div></div></li>";
    
   
    for (var i = 0; i < CurrentDetailList.length; i++) {
        var TotalMostrar = "";
        var arreglo_ = CurrentDetailList[i].nombre.split(',');
        var totalFinal = parseFloat(CurrentDetailList[i].precio) * parseFloat(CurrentDetailList[i].cantidad);
        TotalMostrar = CurrentDetailList[i].cantidad;
        var splitIdentificaEnteros = CurrentDetailList[i].cantidad.toString().split('.');
       
        if (parseFloat(splitIdentificaEnteros[1]) == 0) {
            TotalMostrar = parseFloat(splitIdentificaEnteros[0]);           
        }

        ListaDetalleVARNombre += "<li>";

        ListaDetalleVARNombre += "  <a href='#' class='item-link item-content' id='unos' data-nombre='" + arreglo_[1] + "' data-clave='" + CurrentDetailList[i].clave_listadetalle + "'>";
        ListaDetalleVARNombre += "      <div class='item-inner'>";
        ListaDetalleVARNombre += "          <div class='item-title-row'>";
        ListaDetalleVARNombre += "              <div class='item-title'>" + arreglo_[1] + " </div>";
        ListaDetalleVARNombre += "              <div class='item-after'>$" + totalFinal.toFixed(2) + "</div> ";
        ListaDetalleVARNombre += "          </div>";
        ListaDetalleVARNombre += "           <div class='item-subtitle'>Cant. " + TotalMostrar.toString() + " "+CurrentDetailList[i].Descripcion+" Prec. $ "+CurrentDetailList[i].precio+"</div>"
        ListaDetalleVARNombre += "          <div class='item-text'>" + arreglo_[2] + "</div>";
        ListaDetalleVARNombre += "      </div>";
        ListaDetalleVARNombre += "  </a>";

        ListaDetalleVARNombre += "</li>";
    }



    ListaDetalleVARNombre += "</ul>";
    ListaDetalleVAR += "</ul>";
    $$("#lstListaDetalle").html(ListaDetalleVAR);
    $$("#lstListaDetalle1").html(ListaDetalleVARNombre);
    $$("#divTotalToolbar").html("$ " + TotalLista.toFixed(2));
    $$("#ToolBarTotal").show();
    $$("#ErrorLista").html("");
    if (CurrentDetailList.length == 0) {

        $$("#ErrorLista").html("<div class='content-block media-list'><div class='content-block-inner'>Agregue un producto a su lista.</div></div>");
        $$("#divTotalToolbar").html("");
        $$("#ToolBarTotal").hide();
    }

}
$$(document).on('change', 'input[type="checkbox"]', function () {
    // ;

    var CurrentLogin_ = JSON.parse(localStorage.ListaDetalleActual);



    var Estado = $$(this).attr('value');

    if ($$(this).attr('value') == '1')
        Estado = "0";
    else
        Estado = "1";

    var listaDetalleCHK = $$(this).attr('id');
    var clave_listaActual = "";
    for (var i = 0; i < CurrentLogin_.length; i++) {
        if (listaDetalleCHK == CurrentLogin_[i].clave_listadetalle) {
            ActualizaCheckLista(CurrentLogin_[i].clave_lista, listaDetalleCHK, Estado);
            clave_listaActual = CurrentLogin_[i].clave_lista;



        }
    }
    MuestraListaDetalle(clave_listaActual);
    //// alert($$($$(this).attr('id'))[0].checked);
    // alert($$(this).attr('value'));
});


function MuestraListaDetalle(ClaveListaFav) {

    myApp.showPreloader("Espere ... ");
    var url_ = UrlBase + "listadetalle.php?cve_lista=" + ClaveListaFav;

    $$.ajax({
        type: 'GET',
        url: url_,
        beforeSend: function () {
            //  myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        cache: false,
        success: function (data) {

            if (data != "[]") {
                localStorage.ListaDetalleActual = data;
                ArmaListaDetalle(data);
                //  var CurrentLogin_ = JSON.parse(data);alert(localStorage.CurrentLogin);
            }
            if (data == "[]") {

                $$("#lstListaDetalle").html("<div class='content-block-inner'>No se encontraron resultados.</div>");
                $$("#divTotalToolbar").html("");
            }
        },
        error: function (data) {
            alert(data);
        }
    });


}

function CargaAjax(data, tipo) {
    //localStorage.Productos = JSON.stringify(result);<div class="content-block-title">Productos</div>
    var CurrentList = JSON.parse(data);
    localStorage.AllList = "";
    localStorage.AllNames = "";
    var PullRefresh = "";
    var ExisteFavorito = false;
    var NumFavorito = 0;
    var ClaveListaFav = 0;

    PullRefresh += " <div class='list-block'>";
    PullRefresh += "    <ul>  ";
    for (var i = 0; i < CurrentList.length; i++) {
        localStorage.AllList += CurrentList[i].clave_lista + ",";
        localStorage.AllNames += CurrentList[i].Nombre + ",";
        if (CurrentList[i].estatus == "AC") {
            PullRefresh += "   <li>";
            PullRefresh += "<a href='#' id='btnElegirLista' class='item-link item-content close-panel close-speed-dial' tipolista = '" + CurrentList[i].clave_tipolista + "' nombre='" + CurrentList[i].Nombre + "' value='" + CurrentList[i].clave_lista + "'>";
            PullRefresh += "  <div class='item-inner'>";
            PullRefresh += "<div class='item-title'> <i style='font-size:x-large;' class='icon ion-android-menu color-orange'></i>          " + CurrentList[i].Nombre;
            if (CurrentList[i].clave_tipolista == 1) {

                // PullRefresh += "     <i style='font-size:x-large;' class='icon ion-android-star color-teal'></i>";
                ExisteFavorito = true;
                NumFavorito = CurrentList[i].clave_tipolista;
                if (localStorage.ListaDetalleActiva != undefined)
                    ClaveListaFav = localStorage.ListaDetalleActiva;
                else
                    ClaveListaFav = CurrentList[i].clave_lista;

            }
            PullRefresh += "    </div>";
            PullRefresh += "<!--<div class='item-after'>Label</div>-->";
            PullRefresh += "  </div>";
            PullRefresh += "</a>";
            PullRefresh += "</li>";
        }


    }

    localStorage.AllList = localStorage.AllList.substring(0, localStorage.AllList.length - 1);
    localStorage.AllNames = localStorage.AllNames.substring(0, localStorage.AllNames.length - 1);

    if (ExisteFavorito && tipo == "panel") {

        MuestraFavorito(NumFavorito, ClaveListaFav);
    }

    PullRefresh += "</ul>";
    PullRefresh += " ";
    PullRefresh += "  </div>";
    $$("#lstMisListas").html(PullRefresh);
    //$$(page.container).find('.page-content').html(PullRefresh);

}
function ActualizaCheckLista(lista, listaDe, tipo) {
    var url_ = UrlBase + "updateCheck.php?estado=" + tipo + "&clave_lista=" + lista + "&clave_listaDetalle=" + listaDe;

    $$.ajax({
        type: 'GET',
        url: url_,
        beforeSend: function () {
            //  myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        cache: false,
        success: function (data) {

            if (data == "OK") {

                CargaAjax(data, tipo);
            }
            else {
                alert("Error al intentarse conectar, intente mas tarde.");
            }
        },
        error: function (data) {
            alert(data);
        }
    });
}
function ActualizaFavBD(lista, cliente, da, tipo, TipoAux) {
    var tipolista = TipoAux;
    if (TipoAux == 0)
        tipolista = 2;

    var url_ = UrlBase + "updateStatusLista.php?cve_cliente=" + cliente + "&clave_lista=" + lista + "&clave_tipolista=" + tipolista;

    $$.ajax({
        type: 'GET',
        url: url_,
        beforeSend: function () {
            //  myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        cache: false,
        success: function (data) {

            if (data == "OK") {

                CargaAjax(da, tipo);
            }
            else {
                alert("Error al intentarse conectar, intente mas tarde.");
            }
        },
        error: function (data) {
            alert(data);
        }
    });
}
function MyListas(usuario, tipo, TipoAux) {

    myApp.showPreloader("Cargando Listas");
    var url_ = UrlBase + "listas.php?cve_cliente=" + usuario;

    $$.ajax({
        type: 'GET',
        url: url_,
        beforeSend: function () {
            //  myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        cache: false,
        success: function (data) {
            if (data != "[]") {

                localStorage.ListasActuales = data;

                if (tipo == "panel") {
                    CargaAjax(data, tipo);
                }
                if (tipo == "refresh") {
                    var CurrentList = JSON.parse(data);
                    ActualizaFavBD(CurrentList[0].clave_lista, CurrentList[0].clave_cliente, data, tipo, TipoAux);
                }
                //  var CurrentLogin_ = JSON.parse(data);alert(localStorage.CurrentLogin);
                localStorage.SinListas = "NO";
            }
            else {
                $$("#ErrorLista").html("<div class='content-block media-list'>Agregue una lista para comenzar.</div>");
                $$("#divTotalToolbar").html("");
                $$("#ToolBarTotal").hide();
                $$("#btnFloat").hide();
                localStorage.SinListas = "SI";
                var PullRefresh = " <div class='list-block'>Sin listas disponibles.</div>";
                $$("#lstMisListas").html(PullRefresh);
                //alert("Error al cargar las listas, intente mas tarde.");
            }
        },
        error: function (data) {
            alert(data);
        }
    });
}
function LoginAJAX(usuario, contra) {
    var url_ = UrlBase + "login.php?user=" + usuario + "&psw=" + contra;
    $$.ajax({
        type: 'GET',
        url: url_,
        beforeSend: function () {
            //  myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        cache: false,
        success: function (data) {
            if (data != "[]") {
                
                localStorage.CurrentLogin = data;
                //  var CurrentLogin_ = JSON.parse(data);alert(localStorage.CurrentLogin);
                mainView.router.loadPage("list.html");
            }
            else {
                myApp.addNotification({
                    message: 'Usuario / Contraseña Incorrecta',
                    button: {
                        text: 'Cerrar',
                        close: true
                        //color: 'yellow'
                    }
                });
              
            }
        },
        error: function (data) {

            alert(JSON.stringify(data));
        }
    });
}
function LoadProductsAJAX(e) {
    $$.ajax({
        type: 'POST',
        url: UrlBase + 'test.php',
        beforeSend: function () {
            //  myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        cache: false,
        success: function (data) {
            CargaProductos(data, e);
        },
        error: function (data) {
            alert(data);
        }
    });
}
$$('#btcCloseSession').on('click', function (e) {
    myApp.closePanel();
});
$$('#btnOptions').on('click', function (e) {
    myApp.closePanel();
});
$$('#btAccount').on('click', function (e) {
    myApp.closePanel();
});

$$(document).on('click', '#btnFav', function () {

    var texto = "";
    var tipoLista = $$(this).attr('status');
    var TipoAux;
    if (tipoLista == 0) {
        texto = "Favorito !";
        TipoAux = 1;
    }
    else {
        texto = "Adios al Favorito";
        TipoAux = 0;
    }

    myApp.addNotification({
        message: texto,
        button: {
            text: 'Cerrar'
            //,                    color: 'yellow'
        }
    });
    //alert(localStorage.CurrentCustomer);
    MuestraFavorito(TipoAux, localStorage.ListaDetalleActiva);
    MyListas(localStorage.CurrentCustomer, "refresh", TipoAux);
});
$$(document).on('click', '#btnElegirLista', function () {
    localStorage.ListaDetalleActiva = $$(this).attr('value');
    localStorage.ListaDetalleActivaTipoLista = $$(this).attr('tipolista');
    localStorage.NombreSubLista = $$(this).attr('nombre');

    MuestraFavorito(localStorage.ListaDetalleActivaTipoLista, localStorage.ListaDetalleActiva)
    //myApp.addNotification({
    //    message: 'Seleccionada la lista: ' + $$(this).attr('nombre'),
    //    button: {
    //        text: 'Cerrar'
    //    }
    //});

});

$$(document).on('pageBeforeInit', '.page[data-page="index"]', function (e) {
    //alert("INDES");
})

$$(document).on('pageInit', function (e) {

    var page = e.detail.page;

    // Code for About page
    $$('.close-notification').click();
    if (page.name === 'login') {
      
        $$('.close-notification').click();
        $$('#registroUser').on('click', function (e) {
            
            $$('.close-notification').click();

        });
        
        if (localStorage.marcacheck == "SI") {

            $$('#txtUsername').val(localStorage.CorreoMarca);
            $$("#recordarCh").attr('checked', true);
        }
       
        
        $$('#cmdLogin').on('click', function (e) {
            $$('.close-notification').click();
            myApp.showPreloader("Iniciando Sesión");
            var Usuario = $$('#txtUsername').val(); //'jvega';//
            var Contra = $$('#txtPassword').val(); //123;//
            var check = $$('#recordarCh').is(':checked');
           
            
           

            if (Usuario != '' && Contra != '') {
                if (check) {
                  
                    localStorage.marcacheck = "SI";
                    localStorage.CorreoMarca = Usuario;
                  
                }
                else {
                    localStorage.marcacheck = "";
                    localStorage.CorreoMarca = "";
                }
                LoginAJAX(Usuario, Contra);
            }
            else {
                myApp.hidePreloader();
                myApp.addNotification({
                    message: 'Ingrese Usuario y/o Contraseña',
                    button: {
                        text: 'Cerrar',
                        close: true
                        //color: 'yellow'
                    }
                });
            }

        });
      
    }
    if (page.name === 'registro')
    {
        $$('#Registrar').on('click', function (e) {
            $$('.close-notification').click();
            var nombre = $$('#nom').val();
            var ape = $$('#ap').val();
            var mail = $$('#mail').val();
            var pass = $$('#psw').val();                       
            
            if (nombre != '' && ape != '' && mail != '' && pass != '') {
                var url_ = UrlBase + "InsertCliente.php?nombre=" + nombre + "&ap=" + ape + "&contra=" + pass + "&mail=" + mail;
              
                $$.ajax({
                    type: 'GET',
                    url: url_,
                    beforeSend: function () {
                        myApp.showPreloader();
                    },
                    complete: function () {
                        myApp.hidePreloader();
                    },
                    cache: false,
                    success: function (data) {
               
                        if (data == "OK") {
                            LoginAJAX(mail, pass);
                            

                          
                        }
                        else {
                            myApp.addNotification({
                                message: 'Error al registrarte, intente mas tarde.',
                                button: {
                                    text: 'Cerrar',
                                    close: true
                                    //color: 'yellow'
                                }
                            });
                        }
                    },
                    error: function (data) {
                        alert(data);
                    }
                });
                
            }
            else {
                myApp.addNotification({
                    message: 'Todos los campos son obligatorios.',
                    button: {
                        text: 'Cerrar',
                        close: true
                        //color: 'yellow'
                    }
                });
            }


        });
        
    }
    if (page.name === 'addItem') {
        //alert(localStorage.PrecioActualizar);
        $$(page.container).find('#NombreActualizarProducto').html(localStorage.NombreActualizar);
        $$(page.container).find('#CantidadProducto').val(localStorage.CantidadActualizar);
        $$(page.container).find('#precioProducto').val(localStorage.PrecioActualizar);
        $$(page.container).find('#precioProducto').focus();
        $$(page.container).find('#CantidadProducto').focus();
        //$$(page.container).find('#NombreActualizarProducto').focus();        
        // localStorage.idProductoActualizar
    }
    if (page.name === 'list') {
        var CurrentLogin_ = JSON.parse(localStorage.CurrentLogin);
        $$('#txtNombrePanel').html("HOLA! " + CurrentLogin_[0].nombre);
        var CurrentLogin = JSON.parse(localStorage.CurrentLogin);
        //alert(CurrentLogin[0].clave_cliente);
        localStorage.CurrentCustomer = CurrentLogin[0].clave_cliente;
        MyListas(CurrentLogin[0].clave_cliente, "panel", "");
        //MuestraListaDetalle(localStorage.ListaDetalleActiva);
    }
    if (page.name === 'add') {
        myApp.showPreloader("Cargando Productos");
        var ptrContent = $$('.pull-to-refresh-content');

        ptrContent.on('refresh', function () {
            myApp.showPreloader("Cargando Productos");
            // Emulate 2s loading
            setTimeout(function () {
                // Random image
                LoadProductsAJAX(e);
                // Prepend new list element

                // When loading done, we need to reset it
                myApp.pullToRefreshDone();
            }, 2000);
        });
        var page = e.detail.page;

        LoadProductsAJAX(e);


    }
    if (page.name === 'addP') {
        CargaCategorias();
    }


})

$$(document).on('click', '#CloseSession', function () {
    var check = localStorage.marcacheck;
    var correo = localStorage.CorreoMarca;   
    localStorage.removeItem("CurrentLogin"); 
    localStorage.clear();  
    localStorage.marcacheck = check;
    localStorage.CorreoMarca = correo;
    window.location = "index.html";
    //  mainView.router.loadPage("index.html");
});

$$(document).on('click', '#btnEditarNombre', function () {
    myApp.closeModal();
    myApp.prompt('Escriba un nuevo nombre', '', function (value) {
        
     //   myApp.alert('Your name is "' + value + '". You clicked Ok button');
        var url_ = UrlBase + "UpdateLista.php?lista=" + localStorage.ListaDetalleActiva + "&nombre=" + value;
       
        $$.ajax({
            type: 'GET',
            url: url_,
            beforeSend: function () {
                myApp.showPreloader();
            },
            complete: function () {
                myApp.hidePreloader();
            },
            cache: false,
            success: function (data) {
               
                if (data == "OK") {

                    localStorage.NombreSubLista = value;
                    mainView.router.refreshPage();
                }
                else {
                    alert("Error al editar, intente mas tarde.");
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    });
});

$$(document).on('click', '#btnEliminarLista', function () {
    myApp.closeModal();
    myApp.confirm('¿Seguro que desea eliminar la lista ' + localStorage.NombreSubLista + '? se perderan todos los productos agregados', 'My List', function () {


        var url_ = UrlBase + "EliminarLista.php?clave_lista=" + localStorage.ListaDetalleActiva + "&cliente=" + localStorage.CurrentCustomer;
       
        $$.ajax({
            type: 'GET',
            url: url_,
            beforeSend: function () {
                myApp.showPreloader();
            },
            complete: function () {
                myApp.hidePreloader();
            },
            cache: false,
            success: function (data) {
               
                if (data == "OK") {

                    var Response = localStorage.AllList.split(',');
                    var ResponseName = localStorage.AllNames.split(',');

                    var otraLista = "";
                    var otroNombre = "";
                    for (var i = 0; i < Response.length; i++) {
                        if (Response[i] != localStorage.ListaDetalleActiva) {
                            otraLista = Response[i];
                            otroNombre = ResponseName[i];
                        }
                    }
                    //alert(otraLista);
                    localStorage.ListaDetalleActiva = otraLista;

                    localStorage.NombreSubLista = otroNombre;
                    mainView.router.refreshPage();
                }
                else {
                    alert("Error al eliminar, intente mas tarde.");
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    });
});

$$(document).on('click', '#btnProduc', function () {
    var idP = $$(this).attr('value');
    var nombre = $$(this).attr('data-nombre');
    var precio = $$(this).attr('data-precio');

    localStorage.idProductoActualizar = idP;
    localStorage.NombreActualizar = nombre;
    localStorage.PrecioActualizar = "";
    localStorage.CantidadActualizar = "";
    localStorage.EsEdicionProducto = "NO";
    mainView.router.loadPage("addItem.html");
    // myApp.prompt2('Agregar producto a la lista con el siguiente precio?', '',
    //  function (value) {
    //      var Response = value.split('-');

    //      InsertaListaDetalle(nombre, Response[0], idP, localStorage.ListaDetalleActiva, localStorage.ListaDetalleActiva, Response[1]);

    //  },
    //  function (value) {

    //  }, precio, '1'
    //);


});
$$(document).on('click', '#AgregaProductLista', function () {
    var precio = $$('#precioProducto').val();
    var cantidad = $$('#CantidadProducto').val()
    // alert($$('#precioProducto').val());
    if (precio != "" && cantidad != "") {
        $$('.close-notification').click();
        if (localStorage.EsEdicionProducto == "SI") {
            ActualizaListaDetalle(precio, localStorage.DatoSeleccionado, cantidad);
        }
        else {
            InsertaListaDetalle(localStorage.NombreActualizar, precio, localStorage.idProductoActualizar, localStorage.ListaDetalleActiva, localStorage.ListaDetalleActiva, cantidad);
        }
    }
    else {
        myApp.addNotification({
            message: 'Ingrese Cantidad y Precio',
            button: {
                text: 'Cerrar',
                close: true
                //color: 'yellow'
            }
        });

    }




});

$$(document).on('click', '#MenuSistema', function () {
    var editar = "";
    if (localStorage.SinListas != "SI") {
        
        editar = '<li><a href="#" id="btnEditarNombre" class="item-link list-button">Editar Lista</li>' +
    '<li><a href="#" id="btnEliminarLista" class="item-link list-button">Eliminar Lista</li>';
    }
    var clickedLink = this;
    var popoverHTML = '<div class="popover">' +
                        '<div class="popover-inner">' +
                          '<div class="list-block">' +
                            '<ul>' +
                            editar
                            +
                            '<li><a href="#" id="CloseSession" class="item-link list-button">Cerrar Sesión</li>' +
                            '</ul>' +
                          '</div>' +
                        '</div>' +
                      '</div>'
    myApp.popover(popoverHTML, clickedLink);
    //    myApp.modal({
    //        title: 'Nuevo Producto',
    //        text: main,
    //        buttons: [
    //          {
    //              text: 'Guardar',
    //              bold: true,
    //              onClick: function () {
    //                  myApp.alert('You clicked first button!')
    //              }
    //          },
    //          {
    //              text: 'Cancelar',

    //              onClick: function () {
    //                  myApp.alert('You clicked third button!')
    //              }
    //          },
    //        ]
    //    })
});

$$(document).on('click', '#addLista', function () {
    myApp.closePanel();
    //alert("");
});
$$(document).on('click', '#addListNueva', function () {
    var name = $$("#lstNombre").val();
    var user = localStorage.CurrentCustomer;
    if (name != "") {
        var url_ = UrlBase + "InserLista.php?nombre=" + name + "&usuario=" + user;

        $$.ajax({
            type: 'GET',
            url: url_,
            beforeSend: function () {
                myApp.showPreloader();
            },
            complete: function () {
                myApp.hidePreloader();
            },
            cache: false,
            success: function (data) {

                if (data == "OK") {
                    AsignaNuevaLista(name, user);
                    $$('.close-notification').click();
                }
                else {
                    alert("Error al insertar, intente mas tarde.");
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    }
    else {
        myApp.addNotification({
            message: 'Ingrese un nombre para la lista.',
            button: {
                text: 'Cerrar',
                close: true
                //color: 'yellow'
            }
        });


    }
});
function AsignaNuevaLista(nombre, cliente) {

    var url_ = UrlBase + "obtenerlista.php?lista=" + nombre + "&&cliente=" + cliente;

    $$.ajax({
        type: 'GET',
        url: url_,
        beforeSend: function () {
            myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        cache: false,
        success: function (data) {
            if (data != "") {
                var CurrentList = JSON.parse(data);
                for (var i = 0; i < CurrentList.length; i++) {
                    localStorage.ListaDetalleActiva = CurrentList[i].clave_lista;
                    localStorage.NombreSubLista = CurrentList[i].Nombre;
                }
                mainView.router.loadPage("list.html");
            }

        },
        error: function (data) {
            alert(data);
        }
    });
}
$$(document).on('click', '#InProduct', function () {
    var name = $$("#name").val();
    var pre = $$("#pre").val();
    var cat = $$("#cat").val();
    var precio = $$("#precio").val();
    var nombre = cat + "," + name + "," + pre;
    var cantidad = $$("#cantidad").val();
   
    if (name != "" && pre != "" && cat != "" && precio != "" && cantidad != "") {
        InsertaProducto(nombre, precio, localStorage.CurrentCustomer, cantidad, cat);
    }
    else {
        myApp.addNotification({
            message: 'Todos los campos son obligatorios',
            button: {
                text: 'Cerrar',
                close: true
                //color: 'yellow'
            }
        });
    }


});
function InsertaProducto(nombre, precio, cliente, cantidad, presentac) {
    var url_ = UrlBase + "InsertProducto.php?nombre=" + nombre + "&precio=" + precio + "&cliente=" + cliente + "&presentacion=" + presentac;
    
    $$.ajax({
        type: 'GET',
        url: url_,
        beforeSend: function () {
            myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        cache: false,
        success: function (data) {            
            if (data == "OK") {
                
                var Producto = ObtieneProducto(nombre, precio, cliente, cantidad);
                $$('.close-notification').click();

            }
            else {
                alert("Error al agregar el producto, intente mas tarde.");
            }
        },
        error: function (data) {
            alert(data);
        }
    });
}

function ObtieneProducto(nombre, precio, cliente, cantidad) {
    
    var url_ = UrlBase + "ObtenerProducto.php?nombre=" + nombre + "&precio=" + precio + "&cliente=" + cliente;

    $$.ajax({
        type: 'GET',
        url: url_,
        beforeSend: function () {
            //myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        cache: false,
        success: function (data) {

            if (data != "") {
               
                InsertaListaDetalle(nombre, precio, data, localStorage.ListaDetalleActiva, localStorage.ListaDetalleActiva, cantidad);
            }

        },
        error: function (data) {
            alert(data);
        }
    });
}

function InsertaListaDetalle(nombre, precio, producto, clave_lista, clave_listaDetalle, cantidad) {

    var url_ = UrlBase + "InsertListaDetalle.php?nombre=" + nombre + "&precio=" + precio + "&producto=" + producto + "&clave_lista=" + clave_lista + "&clave_listaDetalle=" + clave_listaDetalle + "&cantidad=" + cantidad;

    $$.ajax({
        type: 'GET',
        url: url_,
        beforeSend: function () {
            myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        cache: false,
        success: function (data) {
            
            if (data == "OK") {
                
                mainView.router.loadPage("list.html");

            }
            else {
                alert("Error al intentarse conectar, intente mas tarde.");
            }
        },
        error: function (data) {
            alert(data);
        }
    });
}
function ActualizaListaDetalle(precio, clave_listaDetalle, cantidad) {

    var url_ = UrlBase + "UpdateListaDetalle.php?detalle=" + clave_listaDetalle + "&precio=" + precio + "&cantidad=" + cantidad;

    $$.ajax({
        type: 'GET',
        url: url_,
        beforeSend: function () {
            //myApp.showPreloader();
        },
        complete: function () { 
            // myApp.hidePreloader();
        },
        cache: false,
        success: function (data) {
            mainView.router.loadPage("list.html");
            //mainView.router.refreshPage();
        },
        error: function (data) {
            alert(data);
        }
    });
}
function CargaCategorias() {
    var url_ = UrlBase + "ObtenerCategorias.php";

    $$.ajax({
        type: 'GET',
        url: url_,
        beforeSend: function () {
            //myApp.showPreloader();
        },
        complete: function () {
            myApp.hidePreloader();
        },
        cache: false,
        success: function (data) {
            IniciaCat(data);
        },
        error: function (data) {
            alert(data);
        }
    });
}
function IniciaCat(result) {
    var CurrentList = JSON.parse(result);
    var arreglo_Resultado;
    var listHTML = '';

    listHTML += '<select id="cat">';
    
    for (var i = 0; i < CurrentList.length; i++) {
        var select = "";
        if (i == 0)
            var select = "selected";

        listHTML += '<option value="' + CurrentList[i].id + '"' + select + '>' + CurrentList[i].cat2 + '</option>';
    }

    listHTML += '</select>';

    $$('#cmbCategoria').append(listHTML);
    $$('#cat').focus();
    $$('#name').focus();
    
};