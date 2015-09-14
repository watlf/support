<!-- Sidebar -->
<div id="sidebar-wrapper">
    <ul class="sidebar-nav nav-pills nav-stacked" id="menu">
        <li>
            <a href="{{url('/')}}"><span class="fa-stack fa-lg pull-left"><i class="glyphicon-home"></i></span>Site</a>
        </li>
        <li class="{{ array_get($status, 'profile')}}">
            <a href="{{url('user/profile')}}"><span class="glyphicon-user"></span> Profile</a>
        </li>
        <li class="{{ array_get($status, 'questions')}}">
            <a href="{{url('user/questions')}}"><span class="glyphicon-th-list"></span> Questions</a>
        </li>
    </ul>
</div><!-- /#sidebar-wrapper -->