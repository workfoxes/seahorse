import {
  Layout,
  Menu,
  Popover,
  Space,
  Spin,
  Button,
  Avatar,
  Skeleton,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  BellOutlined
} from "@ant-design/icons";
import React, { Suspense } from "react";
import logo from "../assert/logo.svg";
import { Route } from "../utils/route";
import { NavLink, Switch } from "react-router-dom";
import { RouteNavigator } from "../utils/route.utils";
// import { DataService } from "../service/service";
import { ErrorBoundary } from "./error.boundry";

const { Header, Sider, Content } = Layout;

export class DefaultLayout extends React.PureComponent<any, any> {
  componentDidMount() {
    this.setState({
//       isLoading: true,
      menu: this.construct_menu(Route),
      route: this.normalize_router(Route),
    });
//     DataService.get("get_user_ctx", {}, {}, {}, {}, false)
//       .then((response: any) => {
//         this.setState({ current_user: response });
//
//       })
//       .catch((error) => {
//         DataService.redirect("auth_sso", {});
//         // this.props.history.push("/auth");
//       });
  }
  state = {
    collapsed: true,
    session_id: "",
    current_user: {
      _id: undefined,
      Avatar: undefined,
      Name: "Bot",
      Email: undefined,
      Features: [],
    },
    isLoading: false,
    menu: [],
    route: [],
  };

  toggle = () => {
    this.setState((prevState: any) => {
      return { collapsed: !prevState.collapsed };
    });
  };

  normalize_router(routes: any, key = "") {
    let _menu: any = [];
    for (var i = 0; i < routes.length; i++) {
      let route = routes[i];
      let feature_access = true;
      if (route.features && route.features.length > 0) {
        feature_access = this.state.current_user.Features.some(
          (r) => route.features.indexOf(r) >= 0
        );
      }
      if (feature_access) {
        let _key = key + route.key;
        if (route.subRoute) {
          let sub_obj = this.normalize_router(route.subRoute, key);
          _menu = _menu.concat(sub_obj);
        }
        route.key = _key;
        _menu.push(route);
      }
    }
    return _menu;
  }

  construct_menu(routes: any, key = "") {
    let _menu: any = [];
    for (let i = 0; i < routes.length; i++) {
      let route = routes[i];
      let feature_access = true;
      if (route.features.length) {
        feature_access = this.state.current_user.Features.some(
          (r) => route.features.indexOf(r) >= 0
        );
      }
      if (feature_access) {
        let _key = key + route.key;
        if (route.subMenu && route.nonMenuLink) {
          let __sub_menu = this.construct_menu(route.subRoute, key);
          if (__sub_menu.length > 0)
            _menu.push(
              <Menu.SubMenu
                key={key + i}
                title={route.name}
                icon={<route.icon />}
              >
                {__sub_menu}
              </Menu.SubMenu>
            );
        } else if (!route?.hide) {
          _menu.push(
            <Menu.Item key={_key} icon={<route.icon />}>
              <NavLink to={route.path}>{route.name}</NavLink>
            </Menu.Item>
          );
        }
      }
    }
    return _menu;
  }
  logout() {
//     DataService.get("auth_logout").then((response: any) =>
//       this.props.history.push("/auth")
//     );
  }

  render() {
    const { location } = this.props;
    const selectedMenuKey = Route.filter(
      (menu) => menu.path === location.pathname
    ).map((item) => item.key);

    return this.state.isLoading ? (
      <div className="spinner">
        <Spin size="large" />
      </div>
    ) : (
      <Spin spinning={false} size="large">
        <Layout style={{ height: "100vh" }}>
          <Sider trigger={null} breakpoint="md" collapsible collapsed={this.state.collapsed} style={{background: "#120338", "width": "16vw"}}>
            <div className="logo" style={{ padding: "20px" }}>
              <img src={logo} alt="logo" style={{ width: "20px", height: "20px"}}></img>
              {!this.state.collapsed && <span style={{ fontSize: "20px", color: "#fff", paddingLeft: "20px", fontWeight: "bolder"}}>TAPCOIN</span>}
            </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["home"]}
              selectedKeys={selectedMenuKey}
            >
              {this.state.menu}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background">
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: this.toggle,
                }
              )}
              <div className="header-right" style={{ float: "right" }}>
                <Space size={25}>
                  <Popover
                    placement="bottomRight"
                    title={"Notification"}
                    content={<p>No Notification</p>}
                    trigger="click"
                  >
                    <BellOutlined />
                  </Popover>
                  <Popover
                    placement="bottomRight"
                    title={this.state.current_user.Email}
                    content={
                      <Button
                        type="dashed"
                        icon={<LogoutOutlined />}
                        style={{ width: "100%" }}
                        onClick={() => this.logout()}
                      >
                        {" "}
                        Logout{" "}
                      </Button>
                    }
                    trigger="click"
                  >
                    {this.state.current_user.Avatar ? (
                      <Avatar
                        size={30}
                        src={this.state.current_user.Avatar}
                        style={{ cursor: "pointer" }}
                      >
                        {this.state.current_user.Name}
                      </Avatar>
                    ) : (
                      <Avatar
                        style={{
                          backgroundColor: "#1890ff",
                          cursor: "pointer",
                        }}
                        size={30}
                      >
                        U
                      </Avatar>
                    )}
                  </Popover>
                </Space>
              </div>
            </Header>
            <Content
              className="site-layout-background"
              style={{ margin: "15px 10px", padding: 10, minHeight: 280 }}
            >
              <Suspense fallback={<Skeleton active />}>
                <ErrorBoundary>
                  <Switch>
                    {this.state.route.map((route: any, index: any) => (
                      <RouteNavigator key={index} {...route}></RouteNavigator>
                    ))}
                  </Switch>
                </ErrorBoundary>
              </Suspense>
            </Content>
          </Layout>
        </Layout>
      </Spin>
    );
  }
}