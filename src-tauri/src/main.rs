#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#[cfg(target_os = "macos")]
use cocoa::appkit::NSWindow;
use tauri_plugin_sql::{Migration, MigrationKind, TauriSql};

use tauri::{App, Manager, Runtime, Window};
pub trait WindowExt {
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, transparetn: bool);
}
impl<R: Runtime> WindowExt for Window<R> {
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, transparent: bool) {
        use cocoa::appkit::{NSWindowStyleMask, NSWindowTitleVisibility};
        unsafe {
            let id = self.ns_window().unwrap() as cocoa::base::id;
            let mut style_mask = id.styleMask();
            style_mask.set(
                NSWindowStyleMask::NSUnifiedTitleAndToolbarWindowMask,
                transparent,
            );
            id.setStyleMask_(style_mask);
            id.setTitleVisibility_(if transparent {
                NSWindowTitleVisibility::NSWindowTitleHidden
            } else {
                NSWindowTitleVisibility::NSWindowTitleVisible
            });

            id.setTitlebarAppearsTransparent_(if transparent {
                cocoa::base::YES
            } else {
                cocoa::base::NO
            });
        }
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(TauriSql::default().add_migrations(
            "sqlite:SniptBank.db",
            vec![Migration {
                version: 1,
                description: "initial databse",
                sql: include_str!("../migrations/2022-04-27.sql"),
                kind: MigrationKind::Up,
            }],
        ))
        // .setup(|app| {})
        .setup(set_up_window)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(target_os = "macos")]
fn set_up_window<R: Runtime>(app: &mut App<R>) -> Result<(), Box<dyn std::error::Error>> {
    let win = app.get_window("main").unwrap();
    let _ = win.set_decorations(true);
    Ok(())
}
