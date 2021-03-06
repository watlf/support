<nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">{{config('app.logo')}}</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand page-scroll" href="#page-top">
                {{config('app.logo')}}
            </a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                @if(Auth::user()->hasRole('admin'))
                    <li>
                        <a class="" style="color: #0b97c4;" href="/admin"><i class="glyphicon glyphicon-cog"></i>&nbsp;Admin panel</a>
                    </li>
                @endif
                    <li>
                        <a class="" style="color: #0b97c4;" href="/user/profile">
                            <i class="glyphicon glyphicon-user"></i>
                            &nbsp;{{Auth::user()->name}}
                        </a>
                    </li>
                <li>
                    <a class="" href="/auth/logout"><i class="glyphicon glyphicon-log-out"></i>&nbsp;Log Out</a>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
</nav>
