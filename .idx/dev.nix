
{ pkgs, ... }:

{ systemPackages = with pkgs; [  # Corrected typo here
    sudo
    python311Packages.pip
    pkgs.busybox
    autorestic
    pkgs.sudo-rs
  ];
}